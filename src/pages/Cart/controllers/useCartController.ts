import { PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import type { ExtendedPurchases } from '@/pages/Cart/core'
import { purchaseService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { useEffect, useState } from 'react'

const useCartController = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])

  const { data: purchasedGoodsInCartData, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseService.getPurchases({ status: PURCHASES_STATUS.IN_CART })
  })

  const purchasedGoodsInCart = purchasedGoodsInCartData?.data.data || []
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)

  useEffect(() => {
    if (isSuccess)
      setExtendedPurchases(
        purchasedGoodsInCart.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: false
        })) || []
      )
  }, [isSuccess, purchasedGoodsInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
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

  return {
    isAllChecked,
    extendedPurchases,
    handleCheck,
    handleCheckAll
  }
}

export default useCartController
