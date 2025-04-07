/*
  Warnings:

  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "type",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'manga';
