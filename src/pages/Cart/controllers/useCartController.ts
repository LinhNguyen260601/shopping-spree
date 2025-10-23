import { PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import type { ExtendedPurchases } from '@/pages/Cart/core'
import { purchaseService } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useEffect, useState } from 'react'

const useCartController = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])

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

  const purchasedGoodsInCart = purchasedGoodsInCartData?.data.data || []
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)

  useEffect(() => {
    if (isSuccess)
      setExtendedPurchases((prev) => {
        const extendedPurchaseObject = keyBy(prev, '_id')

        return (
          purchasedGoodsInCart.map((purchase) => ({
            ...purchase,
            disabled: false,
            checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
          })) || []
        )
      })
  }, [isSuccess, purchasedGoodsInCart])

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

  return {
    isAllChecked,
    extendedPurchases,
    handleCheck,
    handleCheckAll,
    handleQuantity,
    handleTypeQuantity
  }
}

export default useCartController
