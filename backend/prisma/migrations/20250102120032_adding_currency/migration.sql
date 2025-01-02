/*
  Warnings:

  - Added the required column `currency` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'USD');

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "currency" "Currency" NOT NULL;
