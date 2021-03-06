# cloudflare-passbook

[![publish cloudflare worker](https://github.com/billytrend/cloudflare-worker-passbook/actions/workflows/main.yml/badge.svg)](https://github.com/billytrend/cloudflare-worker-passbook/actions/workflows/main.yml)

To get started with your own deployment, follow these steps:

1. Fork the repository
2. In the fork, go to settings > secrets > actions > new repository secret
3. Set up the following secrets [instructions here](https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates#completely-understanding-the-goal) (requires paid apple developer account):
   * SIGNER_CERT - downloaded from apple and converted to pem
   * SIGNER_KEY - a key generated by command line
   * SIGNER_KEY_PASSPHRASE - a password you set from command line
   * PASS_TYPE_IDENTIFIER - you can find this on signer cert, should look like: pass.com.passkit.admin
   * TEAM_IDENTIFIER - you can find this on signer cert, should look like: U4LNY2SS5N
4. Get a cloudflare API key with permission to edit workers and save it as
   * CF_API_TOKEN
6. Go to actions > publish cloudflare worker and hit run
7. Your worker should now be live and serving a hello-world pass

### Demo

This repository is continously [published](https://github.com/billytrend/cloudflare-worker-passbook/actions/workflows/main.yml) and available [here](https://cloudflare-worker-passbook.billytrend.workers.dev/) (link downloads the hello world passbook).

### Projects based on this template

This template is used in the following places:
* [getrunpass.com](https://getrunpass.com) (github: [run-pass/run-pass](https://github.com/run-pass/run-pass))


### How much does it cost to run in cloudflare workers?

As shown in the screenshots below, this function runs in about 280ms. Most of the time is spent in node-forge performing the signing operations. The time taken to run means that this won't be supported by the free (max 10ms) or bundled (max 50ms) [pricing tiers](https://developers.cloudflare.com/workers/platform/pricing#workers). As such for production use, the 5$/month unbound plan is required.

Using this plan, you get 400,000GB-s + 1 million requests included per month. In production environment I've observed the function using 0.22GB-s per request which equated to around 1.8 million requests. Each extra million requests is charged at 15 cents, each extra million GB-s are charged at $12.50. As such I'd estimate the following costs:

|Request count|GB-s|Monthly cost|Notes|
|---|---|---|---|
|1,000,000|220,000|5$|Min monthly cost|
|1,818,181|400,000|5.15$|15 cents for extra requests|
|6,363,636|1,400,000|18.4$|12.50 for extra GB-s + 0.15 * 6 for extra requests|

![image](https://user-images.githubusercontent.com/6671020/152652022-5400d4b4-0784-4d21-b3d8-dd55ee790359.png)

![image](https://user-images.githubusercontent.com/6671020/152652118-49938dd8-1afb-465d-a2bb-791b1f6962c7.png)

