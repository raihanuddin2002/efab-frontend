/*
  Warnings:

  - You are about to drop the column `sale_price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `selling_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "admin_price" REAL,
    "selling_price" REAL NOT NULL,
    "discount" REAL,
    "regular_price" REAL,
    "stock" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" INTEGER,
    "image_link" TEXT,
    "tags" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("admin_price", "category_id", "created_at", "description", "discount", "id", "image_link", "name", "product_code", "regular_price", "stock", "updated_at") SELECT "admin_price", "category_id", "created_at", "description", "discount", "id", "image_link", "name", "product_code", "regular_price", "stock", "updated_at" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_product_code_key" ON "Product"("product_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
