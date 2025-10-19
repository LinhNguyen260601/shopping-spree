import type { Product } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const useProductDetaisController = () => {
  const { data } = useLoaderData()

  const [activeImage, setActiveImage] = useState('')
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])

  const product = data?.data as Product
  const currentImages = useMemo(() => product.images.slice(...currentIndexImages), [product.images, currentIndexImages])

  useEffect(() => {
    if (product && product.images.length > 0) setActiveImage(product.images[0])
  }, [product])

  const handleNextImage = () => {
    if (currentIndexImages[1] < product.images.length) setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  }

  const handlePreviousImage = () => {
    if (currentIndexImages[0] > 0) setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
  }

  const handleSelectActiveImage = (img: string) => () => {
    setActiveImage(img)
  }

  return {
    product,
    activeImage,
    currentImages,
    handleNextImage,
    handlePreviousImage,
    handleSelectActiveImage
  }
}

export default useProductDetaisController
