# timeside-ts-fetch-client

This is the repo for the Typescript client of Timeside REST API.
The code in this repository is auto-generated from the OpenAPI (v3.0) specifications provided by Timeside (and Django REST Framework).

## Journey

There are two major versions used for API specifications:
- OpenAPI (v2.0)
- OpenAPI (v3.0)

NB: OpenAPI is sometimes called Swagger. For more information, see https://swagger.io/blog/api-strategy/difference-between-swagger-and-openapi/

In order to generate the client, we need a generator.
We have:
- swagger-api/swagger-codegen 2.X (for specs Swagger v2.X)
- swagger-api/swagger-codegen 3.X (for specs OpenAPI v3.X)
- OpenAPITools/openapi-generator (for Swagger v2.X AND OpenAPI v3.x), fork of swagger-codegen 2.X with OpenAPI v3.X support

We want to have a Typescript client (for static type checks) and using the fetch native API (natively supported by modern web browsers).

### swagger-codegen 2.X

As of today, the last version is [2.4.10](https://hub.docker.com/r/swaggerapi/swagger-codegen-cli/tags)

To generate, we use the following command:
```
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli:2.4.10 generate \
         -i /local/openapi-schema.yml \
         -l typescript-fetch \
         -o /local/swagger-codegen-timeside-ts-fetch
```

But it triggers the following error:

```
com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'openapi': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')
```

Because [it does not supports Swagger v2.X](https://github.com/swagger-api/swagger-codegen/issues/9520). So, we'll have to use something else.

### swagger-codegen 3.X

As of today, the last version is [3.0.14](https://hub.docker.com/r/swaggerapi/swagger-codegen-cli-v3/tags)

```
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:3.0.14 generate \
         -i /local/openapi-schema.yaml \
         -l typescript-fetch \
         -o /local/swagger-codegen-v3-timeside-ts-fetch
```

However, it throws :
```
Exception in thread "main" java.lang.RuntimeException: Can't load config class with name typescript-node Available: aspnetcore, csharp, csharp-dotnet2, go-server, dynamic-html, html, html2, java, jaxrs-cxf-client, jaxrs-cxf, inflector, jaxrs-cxf-cdi, jaxrs-spec, jaxrs-jersey, jaxrs-di, jaxrs-resteasy-eap, jaxrs-resteasy, micronaut, spring, nodejs-server, openapi, openapi-yaml, kotlin-client, kotlin-server, php, python, python-flask, scala, scala-akka-http-server, swift3, swift4, typescript-angular, javascript
```

Because [it does not supports typescript-fetch](https://github.com/swagger-api/swagger-codegen/issues/8834)

We can still try to export it with javascript

```
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:3.0.14 generate \
         -i /local/openapi-schema.yaml \
         -l javascript \
         -o /local/swagger-codegen-v3-timeside-javascript
```

But it throws

```
Exception in thread "Thread-1" java.lang.NullPointerException
  at io.swagger.codegen.v3.generators.javascript.JavaScriptClientCodegen.escapeQuotationMark(JavaScriptClientCodegen.java:1076)
  at io.swagger.codegen.v3.generators.javascript.JavaScriptClientCodegen.preprocessOpenAPI(JavaScriptClientCodegen.java:265)
  at io.swagger.codegen.v3.DefaultGenerator.configureGeneratorProperties(DefaultGenerator.java:216)
  at io.swagger.codegen.v3.DefaultGenerator.generate(DefaultGenerator.java:777)
  at io.swagger.codegen.v3.cli.cmd.Generate.run(Generate.java:351)
  at java.lang.Thread.run(Thread.java:748)
```

Let's also try the `typescript-angular` export

```
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:3.0.14 generate \
         -i /local/openapi-schema.yaml \
         -l typescript-angular \
         -o /local/swagger-codegen-v3-timeside-ts-angular
```

and it works ! However, we don't use Angular, so we'll have to find another solution.

### openapi-generator


For more information on this generator and why they forked swagger-codegen, see https://github.com/OpenAPITools/openapi-generator/blob/master/docs/qna.md
As of today, the last version is [4.3.1](https://hub.docker.com/r/openapitools/openapi-generator-cli/tags)

```
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli:v4.3.1 generate \
         -i /local/openapi-schema.yml \
         -g typescript-fetch \
         -o /local/openapi-generator-timeside-ts-fetch
```

And it works !

The generator can take a configuration file as a YAML or JSON file.

typescript-fetch.config.yml
```
# See docs: https://openapi-generator.tech/docs/generators/typescript-fetch
npmName: timeside-client
npmVersion: '1.0.0'
typescriptThreePlus: true
```

The main feature is the `typescriptThreePlus: true` flag which make it compatible with Typescript 3.6+.

The generated build is better than the one generated by swagger-codegen because it :
- Splits the model in another directory
- Take an optional fetch configuration (we need to set {credentials: 'include'} to send cookies)
- Take an optional fetch function for polyfill
- Generates a package.json to be published on NPM
- Compile successfully without any manual changes

So, `openapi-generator` seems to be the best option right now.
