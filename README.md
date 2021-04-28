# businext.ai

Businext – the **bus**iness **in**sight **ext**ractor **a**nd **i**nterpreter – is an open-source tool that makes it easy to get answers about a business. Watch our introductory video by clicking below:

[![Businext - How it Works](how-businext-works.png)](https://youtu.be/lj-PPQe61I8)

# Configurations

These configurations are to set the api keys for the various services that are used to fetch images and data from. These are to be set in a `.env` file in the root directory of the project.

| Environment Variable Name | Value Format |                                 Example                                  | Explanation                                                                                       |
| ------------------------- | :----------: | :----------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------- |
| `BUSINESS_API_CONFIG`     |     JSON     | Click [here](README.md#business_api_config-example) to go to the example | Serialized Configuration object containing your confidential information to access the APIs. |

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
