# businext.ai

Businext – the **bus**iness **in**sight **ext**ractor **a**nd **i**nterpreter – is an open-source tool that makes it easy to get answers about a business. Watch our introductory video by clicking below:

[![Businext - How it Works](how-businext-works.png)](https://youtu.be/lj-PPQe61I8)

# Configurations

To set up this project, the following must be configured:

- data provider
- extraction provider
- interpretation provider

These configurations set the api keys for the various services that are used throughout the project. These are to be set in a `.env` file in the root directory of the project.

| Environment Variable Name        | Value Format |                                     Example                                     | Explanation                                                                                                                                                                                                      |
| -------------------------------- | :----------: | :-----------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BUSINESS_API_CONFIG`            |     JSON     |    Click [here](README.md#business_api_config-example) to go to the example     | Serialized Configuration object containing your confidential information to access the APIs.                                                                                                                     |
| `IMAGE_PROVIDERS`                |    STRING    |                     IMAGE_PROVIDERS=YELP,GOOGLE_PLACES,MOCK                     | Configures which image provider to use and each provider is comma separated. A list of the providers and a brief explanation of them can be found [here](src/providers/data_providers/README.md).                |
| `GOOGLE_APPLICATION_CREDENTIALS` |     PATH     | GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json" | Provides authentication credentials to your application code. For an explanation on how to obtain this file, refer to the Google Vision documentation linked [here](https://cloud.google.com/vision/docs/setup). |

## `BUSINESS_API_CONFIG` Example

```bash
BUSINESS_API_CONFIG='{"googlePlaces":{"apiKey":"your-api-key"},"yelp":{"apiKey":"your-api-key","clientID":"your-client-ID"},"openCage":{"apiKey":"your-api-key"}}'
```

This is what it looks like as a JSON object:

```json
{
	"googlePlaces": {
		"apiKey": "your-api-key"
	},
	"yelp": {
		"apiKey": "your-api-key",
		"clientID": "your-client-ID"
	},
	"openCage": {
		"apiKey": "your-api-key"
	}
}
```
