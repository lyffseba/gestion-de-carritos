urls=(
  "https://images.unsplash.com/photo-1548657662-817ab4644a4e"
  "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7"
  "https://images.unsplash.com/photo-1608508493010-33230c149eb0"
  "https://images.unsplash.com/photo-1578474846543-383efa25608c"
  "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2"
)
for url in "${urls[@]}"; do
  status=$(curl -sI "$url" | grep HTTP | awk '{print $2}')
  echo "$status $url"
done
