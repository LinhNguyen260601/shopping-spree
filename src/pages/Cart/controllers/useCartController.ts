import { PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import { AppContext } from '@/contexts'
import { purchaseService } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useCallback, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const useCartController = () => {
  const location = useLocation()
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const {
    data: purchasedGoodsInCartData,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseService.getPurchases({ status: PURCHASES_STATUS.IN_CART })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseService.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseService.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message)
      refetch()
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseService.deletePurchase,
    onSuccess: (data) => {
      toast.success(data.data.message)
      refetch()
    }
  })

  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasedGoodsInCart = purchasedGoodsInCartData?.data.data || []
  const isAllChecked = extendedPurchases.length > 0 && extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = checkedPurchases.reduce(
    (result, current) => result + current.product.price * current.buy_count,
    0
  )
  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce(
    (result, current) => result + (current.product.price_before_discount - current.product.price) * current.buy_count,
    0
  )

  useEffect(() => {
    if (isSuccess)
      setExtendedPurchases((prev) => {
        const extendedPurchaseObject = keyBy(prev, '_id')

        return (
          purchasedGoodsInCart.map((purchase) => {
            const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id

            return {
              ...purchase,
              disabled: false,
              checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchaseObject[purchase._id]?.checked)
            }
          }) || []
        )
      })
  }, [isSuccess, purchasedGoodsInCart])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, quantity: number) => (value: number) => {
    if (value === purchasedGoodsInCart[purchaseIndex].buy_count || value < 1 || value > quantity) return

    const purchase = extendedPurchases[purchaseIndex]
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].disabled = true
      })
    )
    updatePurchaseMutation.mutate({
      product_id: purchase.product._id,
      buy_count: value
    })
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = useCallback(() => {
    if (checkedPurchases.length === 0) return
    const body = checkedPurchases.map((purchase) => ({
      product_id: purchase.product._id,
      buy_count: purchase.buy_count
    }))
    buyProductsMutation.mutate(body)
  }, [buyProductsMutation, checkedPurchases])

  return {
    isAllChecked,
    areBuyingProducts: buyProductsMutation.isPending,
    extendedPurchases,
    checkedPurchasesCount,
    totalCheckedPurchasePrice,
    totalCheckedPurchaseSavingPrice,
    handleCheck,
    handleDelete,
    handleCheckAll,
    handleQuantity,
    handleTypeQuantity,
    handleBuyPurchases,
    handleDeleteManyPurchases
  }
}

export default useCartController
