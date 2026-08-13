import json
from decimal import Decimal
from pathlib import Path

from django.db import migrations
from django.utils.dateparse import parse_datetime


def normalize_image_path(value):
    if not value:
        return ""

    normalized = str(value).replace("\\", "/")
    if normalized.startswith("/media/"):
        normalized = normalized[len("/media/") :]
    elif normalized.startswith("media/"):
        normalized = normalized[len("media/") :]

    if "products/" in normalized:
        return normalized[normalized.index("products/") :]

    filename = Path(normalized).name
    return f"products/{filename}" if filename else ""


def load_initial_products(apps, schema_editor):
    Category = apps.get_model("store", "Category")
    Product = apps.get_model("store", "Product")

    fixture_path = Path(__file__).resolve().parent.parent / "fixtures" / "initial_products.json"
    if not fixture_path.exists():
        return

    with fixture_path.open("r", encoding="utf-8") as fixture_file:
        records = json.load(fixture_file)

    category_by_fixture_pk = {}

    for record in records:
        if record.get("model") != "store.category":
            continue

        fields = record.get("fields", {})
        slug = fields.get("slug")
        name = fields.get("name", "")
        if not slug:
            continue

        category, _ = Category.objects.update_or_create(
            slug=slug,
            defaults={"name": name},
        )
        category_by_fixture_pk[record.get("pk")] = category

    for record in records:
        if record.get("model") != "store.product":
            continue

        fields = record.get("fields", {})
        fixture_category_pk = fields.get("category")
        category = category_by_fixture_pk.get(fixture_category_pk)
        if category is None:
            category = Category.objects.filter(pk=fixture_category_pk).first()
        if category is None:
            continue

        name = fields.get("name", "")
        if not name:
            continue

        price = fields.get("price", "0")
        defaults = {
            "description": fields.get("description", ""),
            "price": Decimal(str(price)),
            "image": normalize_image_path(fields.get("image", "")),
        }

        created_at = fields.get("created_at")
        if created_at:
            parsed_created_at = parse_datetime(created_at)
            if parsed_created_at is not None:
                defaults["created_at"] = parsed_created_at

        Product.objects.update_or_create(
            category=category,
            name=name,
            defaults=defaults,
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0005_alter_order_user"),
    ]

    operations = [
        migrations.RunPython(load_initial_products, reverse_code=noop_reverse),
    ]
