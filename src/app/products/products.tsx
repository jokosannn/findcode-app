'use client'

import { notFound } from 'next/navigation'

import ProductReel from '@/components/product-reel'
import ProductSkeleton from '@/components/skeleton/product-skeleton'
import { getProductsFilters } from '@/lib/data'
import { useQuery } from '@tanstack/react-query'

interface IProps {
  query?: string
  category?: string
}

const Products = ({ query, category }: IProps) => {
  const queryKey = ['products', query && `q=${query}`, category && `cat=${category}`].filter(Boolean)

  const { data, isPending, isFetching, error } = useQuery({
    queryKey,
    queryFn: () => getProductsFilters({ query, category }),
    gcTime: query ? 0 : 5 * 60 * 1000
  })

  if (isPending || isFetching) {
    return <ProductSkeleton />
  }

  if (error || !data?.success) {
    return notFound()
  }

  const products = data?.data || []

  if (products.length === 0) {
    return <p className="mt-2 text-muted-foreground">Product tidak ada.</p>
  }

  return <ProductReel type="grid" products={products} />
}

export default Products
