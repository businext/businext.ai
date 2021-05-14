# Image Providers

Image providers are responsible for fetching images of businesses from an external source. Below details the currently configured providers.

## Mock

This provider is meant to be used for testing purposes. Since the other providers are using third-party APIs, extensive use of those providers for testing will become costly. This mock provider returns 2 stock image urls. If desired, one can configure the mock provider to return different images by modifying the return object in the `getBusinessImages` function found in the `mockBusinessImageProvider.ts` file.

To enable the mock image provider, add "`MOCK`" to the `IMAGE_PROVIDERS` environment variable.

## Google Places

The Google Places image provider uses the [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) to fetch images for a given business. The Google Places API can return a maximum of 10 images. Using this provider can be quite expensive as it requires 12 separate API calls to fetch those 10 images. The list of photos can be found by calling the [Place Details](https://developers.google.com/maps/documentation/places/web-service/details) API. However, to use the `Place Details` API, it requires a place ID which can be found by calling the [Place Search](https://developers.google.com/maps/documentation/places/web-service/search) API providing it with an address. Furthermore, the response of the `Place Details` API contains an array of `photo` objects which contains a `photo_reference`. A `photo_reference` is a string that is used to identify a photo when you call the `Photo Request` API. We need to call that API 10 times to get all 10 photos.

To enable the Google Places image provider, add "`GOOGLE_PLACES`" to the `IMAGE_PROVIDERS` environment variable.

## Yelp

The Yelp image provider uses the [Yelp Fusion API](https://www.yelp.com/fusion) to fetch images for a given business. It uses the [Business Details](https://www.yelp.com/developers/documentation/v3/business) API to fetch a maximum of 3 photos. To use the `Business Details` API, it requires the geocode of the business location which is acquired by using the [OpenCage API](https://opencagedata.com/api).

To enable the Yelp image provider, add "`YELP`" to the `IMAGE_PROVIDERS` environment variable.
