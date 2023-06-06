import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyMultipart from "@fastify/multipart";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const application = fastify({
    logger: true
})

application.register(fastifyMultipart, {
    addToBody: true
});
application.register(fastifySwagger);
application.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

