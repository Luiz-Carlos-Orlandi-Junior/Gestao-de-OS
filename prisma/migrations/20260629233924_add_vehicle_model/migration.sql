/*
  Warnings:

  - Made the column `fipe_code` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "fipe_code" SET NOT NULL;
