/*
  Warnings:

  - You are about to drop the column `nama` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "nama",
ADD COLUMN     "name" VARCHAR(255);
