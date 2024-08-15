/*
  Warnings:

  - You are about to drop the column `countryId` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_countryId_fkey";

-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_userId_fkey";

-- DropIndex
DROP INDEX "user_addresses_userId_key";

-- AlterTable
ALTER TABLE "user_addresses" DROP COLUMN "countryId",
DROP COLUMN "userId",
ADD COLUMN     "country_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_addresses_user_id_key" ON "user_addresses"("user_id");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
