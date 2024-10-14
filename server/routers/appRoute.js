const express = require('express');

const router = express.Router();
// const { authMiddleware } = require('../middlewares/authentication');
// const { hasPermissions } = require('../modules/permission');
// const { uploadImg } = require('../middlewares/multer');
const validate = require('../validators/validate');




// function generateRoutes(entity, controller ){
//     const {ListAll , ReadItem , CreateItem , RemoveItem , UpdateItem} = controller;

//     router.get(`/${entity}s/`,ListAll);
//     router.get(`/${entity}/:id`,ReadItem);
//     router.post(`/${entity}/add`,CreateItem);
//     router.delete(`/${entity}/:id`, RemoveItem);
//     router.put(`/${entity}/:id`,UpdateItem);
// }



function generateRoutes(entity, controller, schema ){
    const {ListAll , ReadItem , CreateItem , RemoveItem , UpdateItem} = controller;

    router.get(`/${entity}s/`,ListAll);
    router.get(`/${entity}/:id`,ReadItem);
    router.post(`/${entity}/add`,validate(schema),CreateItem);
    router.delete(`/${entity}/:id`, RemoveItem);
    router.put(`/${entity}/:id`,validate(schema),UpdateItem);
}


const entities = {
    user: 'user',
    news: 'news',
    category: "category",
    listing: "listing",
    tool: "tool",
    tutorial: "tutorial",
    gptList: "gptList",
    event: "event",
    blog: "blog",
    contact: "contact",
};


const controllers ={
    category: require('../contollers/category'),
    listing: require('../contollers/listing'),
    tool: require('../contollers/tool'),
    news: require('../contollers/news'),
    tutorial: require('../contollers/tutorial'),
    gptList: require('../contollers/gptlist'),
    event: require('../contollers/event'),
    blog: require('../contollers/blog'),
    contact: require('../contollers/contact'),
};

const schemas = {
    category: require('../validators/Schemas').categorySchema,
    listing: require('../validators/Schemas').listingSchema,
    tool: require('../validators/Schemas').toolSchema,
    news: require('../validators/Schemas').newsSchema,
    tutorial: require('../validators/Schemas').tutorialSchema,
    gptList: require('../validators/Schemas').gptListSchema,
    event: require('../validators/Schemas').eventSchema,
    blog: require('../validators/Schemas').blogSchema,
    contact: require('../validators/Schemas').contactSchema,
};


generateRoutes(entities.category, controllers.category, schemas.category );
generateRoutes(entities.listing, controllers.listing, schemas.listing);
generateRoutes(entities.tool, controllers.tool, schemas.tool);
generateRoutes(entities.news, controllers.news, schemas.news);
generateRoutes(entities.tutorial, controllers.tutorial, schemas.tutorial );
generateRoutes(entities.gptList, controllers.gptList, schemas.gptList );
generateRoutes(entities.event, controllers.event, schemas.event);
generateRoutes(entities.blog, controllers.blog, schemas.blog);
generateRoutes(entities.contact, controllers.contact, schemas.contact)

module.exports = router;