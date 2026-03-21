#!/bin/bash
# Kids Rides Management - Google Cloud Infrastructure Provisioning
# Run this script directly in Google Cloud Shell (https://shell.cloud.google.com)

set -e

echo "🚀 Starting Google Cloud Infrastructure Setup for Kids Rides Management..."

# 1. Variables
PROJECT_ID=$(gcloud config get-value project)
REGION="europe-west1" # Adjust to your preferred region
BUCKET_NAME="lindo-hogar-media-$PROJECT_ID"
DB_INSTANCE_NAME="lindo-hogar-db"

echo "Using Project ID: $PROJECT_ID in Region: $REGION"

# 2. Enable Required APIs
echo "Enabling necessary APIs (Cloud Run, Cloud Build, Cloud SQL, Storage, IAM, PubSub)..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  sqladmin.googleapis.com \
  storage-component.googleapis.com \
  iamcredentials.googleapis.com \
  identitytoolkit.googleapis.com \
  pubsub.googleapis.com

# 3. Create Cloud Storage Bucket for Product Media
echo "Creating Cloud Storage bucket: gs://$BUCKET_NAME"
if ! gsutil ls -b "gs://$BUCKET_NAME" > /dev/null 2>&1; then
  gsutil mb -l $REGION "gs://$BUCKET_NAME"
  # Make the bucket publicly readable for product images
  gsutil iam ch allUsers:objectViewer "gs://$BUCKET_NAME"
  echo "✅ Bucket created and set to public read."
else
  echo "⚠️ Bucket already exists."
fi

# 4. Create Cloud SQL (PostgreSQL) Instance
echo "Creating Cloud SQL PostgreSQL instance (this may take 5-10 minutes)..."
if ! gcloud sql instances describe $DB_INSTANCE_NAME > /dev/null 2>&1; then
  gcloud sql instances create $DB_INSTANCE_NAME \
    --database-version=POSTGRES_15 \
    --region=$REGION \
    --root-password="ChangeMe123!" \
    --tier=db-f1-micro
  echo "✅ Cloud SQL instance created."
else
  echo "⚠️ Cloud SQL instance already exists."
fi

# 5. Create the database inside the instance
echo "Creating 'lindo_hogar_prod' database..."
gcloud sql databases create lindo_hogar_prod --instance=$DB_INSTANCE_NAME || echo "Database already exists"

# 6. Setup complete
echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Change your Cloud SQL root password from 'ChangeMe123!' immediately."
echo "2. Initialize Firebase Authentication manually via the Google Cloud Console."
echo "3. To deploy the Next.js app, run:"
echo "   gcloud run deploy lindo-hogar-frontend --source . --region=$REGION --allow-unauthenticated"
echo ""
echo "Done!"
