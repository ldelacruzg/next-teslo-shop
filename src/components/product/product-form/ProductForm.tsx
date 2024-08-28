"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import clsx from "clsx";

import { Category, Product, ProductImage } from "@/interfaces";
import { createUpdateProduct } from "@/actions";

interface Props {
  product: Partial<Product> & { productImages?: ProductImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface ProductFormInputs {
  description: string;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string;
  title: string;
  categoryId: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

export const ProductForm = ({
  product: { images, ...product },
  categories
}: Props) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { isValid }, getValues, setValue, watch } = useForm<ProductFormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(','),
      sizes: product.sizes ?? []
    }
  })

  watch('sizes')

  const onSubmit = async (data: ProductFormInputs) => {
    const { ...productToSave } = data

    const formData = new FormData()

    if (product.id) {
      formData.append('id', product.id)
    }

    formData.append('title', productToSave.title)
    formData.append('description', productToSave.description)
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('price', productToSave.price.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('slug', productToSave.slug)
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId.toString())
    formData.append('gender', productToSave.gender)

    const { ok, errors, data: res } = await createUpdateProduct(formData)

    if (!ok) {
      console.log({ errors })
      return
    }

    router.replace(`/admin/products/${res?.slug}`)
  }

  const onToggleSize = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            {...register('title', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            {...register('slug', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            {...register('price', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            {...register('tags', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register('gender', { required: true })}
            className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            {...register('categoryId', { required: true })}
            className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            {
              categories.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            }
          </select>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx("w-full", {
            "btn-primary": isValid,
            "btn-disabled": !isValid
          })}>
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            {...register('inStock', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200" />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Sizes</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                <div
                  key={size}
                  onClick={() => onToggleSize(size)}
                  className={clsx(
                    "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer", {
                    "bg-blue-500 text-white": getValues('sizes').includes(size)
                  })}>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {
              product.productImages?.map(image => (
                <div key={image.id} className="relative" >
                  <button type="button" className="absolute right-0 bottom-0 rounded-full p-2 bg-red-600 text-white">
                    <IoTrashOutline size={24} />
                  </button>
                  <Image
                    priority
                    src={`/products/${image.url}`}
                    alt={product.title ? product.title : ''}
                    width={400}
                    height={400}
                    className="rounded shadow-lg"
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </form>
  );
};