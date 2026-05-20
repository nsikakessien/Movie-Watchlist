/*
  Warnings:

  - You are about to drop the column `runTime` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "runTime",
ADD COLUMN     "runtime" INTEGER;
