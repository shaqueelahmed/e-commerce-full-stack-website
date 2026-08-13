import json
from pathlib import Path

from django.core.management.base import BaseCommand

from store.models import Category, Product


def normalize_image_path(value: str | None) -> str:
    if not value:
        return ""

    normalized = value.replace("\\", "/")
    if normalized.startswith("/media/"):
        normalized = normalized[len("/media/") :]
    elif normalized.startswith("media/"):
        normalized = normalized[len("media/") :]

    if "products/" in normalized:
        return normalized[normalized.index("products/") :]

    filename = Path(normalized).name
    return f"products/{filename}" if filename else ""


class Command(BaseCommand):
    help = "Export Category and Product data to store/fixtures/initial_products.json"

    def handle(self, *args, **options):
        fixtures_dir = Path(__file__).resolve().parents[2] / "fixtures"
        fixtures_dir.mkdir(parents=True, exist_ok=True)
        fixture_path = fixtures_dir / "initial_products.json"

        payload = []

        for category in Category.objects.order_by("id"):
            payload.append(
                {
                    "model": "store.category",
                    "pk": category.pk,
                    "fields": {
                        "name": category.name,
                        "slug": category.slug,
                    },
                }
            )

        for product in Product.objects.order_by("id"):
            payload.append(
                {
                    "model": "store.product",
                    "pk": product.pk,
                    "fields": {
                        "category": product.category_id,
                        "name": product.name,
                        "description": product.description,
                        "price": str(product.price),
                        "image": normalize_image_path(product.image.name if product.image else ""),
                        "created_at": product.created_at.isoformat().replace("+00:00", "Z"),
                    },
                }
            )

        with fixture_path.open("w", encoding="utf-8") as fixture_file:
            json.dump(payload, fixture_file, indent=2)
            fixture_file.write("\n")

        self.stdout.write(
            self.style.SUCCESS(
                f"Exported {len(payload)} records to {fixture_path.as_posix()}"
            )
        )
