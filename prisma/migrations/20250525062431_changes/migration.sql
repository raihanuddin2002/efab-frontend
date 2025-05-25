-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("created_at", "description", "id", "name", "updated_at") SELECT "created_at", "description", "id", "name", "updated_at" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "admin_price" REAL DEFAULT 0,
    "selling_price" REAL NOT NULL,
    "discount" REAL DEFAULT 0,
    "regular_price" REAL DEFAULT 0,
    "stock" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" INTEGER,
    "image_link" TEXT DEFAULT '',
    "tags" TEXT DEFAULT '',
    "is_active" BOOLEAN DEFAULT true,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("admin_price", "category_id", "created_at", "description", "discount", "id", "image_link", "is_active", "name", "product_code", "regular_price", "selling_price", "stock", "tags", "updated_at") SELECT "admin_price", "category_id", "created_at", "description", "discount", "id", "image_link", "is_active", "name", "product_code", "regular_price", "selling_price", "stock", "tags", "updated_at" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_product_code_key" ON "Product"("product_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
