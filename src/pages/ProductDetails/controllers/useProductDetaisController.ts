import type { Product } from '@/types'
import { useMemo, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const useProductDetaisController = () => {
  const { data } = useLoaderData()

  const [activeImage, setActiveImage] = useState(() => {
    const product = data?.data as Product
    return product?.images?.[0] || ''
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])

  const imageRef = useRef<HTMLImageElement>(null)

  const product = data?.data as Product
  const currentImages = useMemo(() => product.images.slice(...currentIndexImages), [product.images, currentIndexImages])

  const handleNextImage = () => {
    if (currentIndexImages[1] < product.images.length) setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  }

  const handlePreviousImage = () => {
    if (currentIndexImages[0] > 0) setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
  }

  const handleSelectActiveImage = (img: string) => () => {
    setActiveImage(img)
  }

  // Method 1: Get offsetX, offsetY when we handle bubble event
  const handleZoom = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { offsetX, offsetY } = event.nativeEvent

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = `${naturalWidth}px`
    image.style.height = `${naturalHeight}px`
    image.style.maxWidth = 'unset'
    image.style.top = `${top}px`
    image.style.left = `${left}px`
  }

  // Method 2: Get offsetX, offsetY when we're not handle bubble, and dont need pointer-events-none on image
  // const handleZoom = (event: React.MouseEvent<HTMLImageElement>) => {
  //   const rect = event.currentTarget.getBoundingClientRect()
  //   const image = imageRef.current as HTMLImageElement
  //   const { naturalWidth, naturalHeight } = image
  //   const offsetX = event.pageX - (rect.x + window.scrollX)
  //   const offsetY = event.pageY - (rect.y + window.scrollY)
  //   const top = offsetY * (1 - naturalHeight / rect.height)
  //   const left = offsetX * (1 - naturalWidth / rect.width)
  //   image.style.width = `${naturalWidth}px`
  //   image.style.height = `${naturalHeight}px`
  //   image.style.maxWidth = 'unset'
  //   image.style.top = `${top}px`
  //   image.style.left = `${left}px`
  // }

  const handleZoomLeave = () => {
    imageRef.current?.removeAttribute('style')
  }

  return {
    product,
    imageRef,
    activeImage,
    currentImages,
    handleZoom,
    handleZoomLeave,
    handleNextImage,
    handlePreviousImage,
    handleSelectActiveImage
  }
}

export default useProductDetaisController
