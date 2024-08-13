import { PrismaClient } from '@prisma/client'
import { initialData } from './data'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { products, users } = initialData

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
