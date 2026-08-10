-- CreateEnum
CREATE TYPE "ServiceOrderStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "service_orders" (
    "id_service_order" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ServiceOrderStatus" NOT NULL DEFAULT 'OPEN',
    "price" DECIMAL(65,30),
    "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "service_orders_pkey" PRIMARY KEY ("id_service_order")
);

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id_vehicle") ON DELETE RESTRICT ON UPDATE CASCADE;
