import { PrismaClient } from '@prisma/client'
import { initialData } from './data'

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async tx => {
    await tx.productImage.deleteMany()
    await tx.orderItem.deleteMany()
    await tx.product.deleteMany()
    await tx.userAddress.deleteMany()
    await tx.country.deleteMany()
    await tx.orderAddress.deleteMany()
    await tx.order.deleteMany()
    await tx.category.deleteMany()
    await tx.user.deleteMany()
  })

  const { products, users, countries } = initialData

  // Add countries
  await prisma.country.createMany({
    data: countries
  })

  // Add users
  await prisma.user.createMany({
    data: users
  })

  // Add products and categories
  for (const p of products) {
    const { images, type: categoryName, ...product } = p

    await prisma.product.create({
      data: {
        ...product,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName }
          }
        },
        productImages: {
          createMany: {
            data: images.map(url => ({ url }))
          }
        }
      }
    })
  }
}

(async () => {
  try {
    await main()
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
})()
