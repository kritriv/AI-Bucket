const express = require('express');
const router = express.Router();
const validate = require('../validators/validate');
const { authMiddleware } = require('../middlewares/authentication');
const { hasPermissions } = require('../modules/permission');
const { createUploadMiddleware } = require('../middlewares/multer');

// Function to generate routes dynamically
function generateRoutes(entity, controller, schema, uploadFields) {
    if (!controller || !schema) {
        console.warn(`Skipping routes for entity: ${entity} due to missing controller or schema.`);
        return;
    }

    const { ListAll, ReadItem, CreateItem, RemoveItem, UpdateItem } = controller;

    // Ensure the basic CRUD handlers exist before defining the routes
    if (ListAll) router.get(`/${entity}s/`, ListAll);
    if (ReadItem) router.get(`/${entity}/:id`, ReadItem);
    if (CreateItem) {
        router.post(
            `/${entity}/create`,
            authMiddleware(hasPermissions('MEDIUM')), // Route for creating category
            createUploadMiddleware(uploadFields), // Handle file upload first (Multer)
            validate(schema), // Then validate the schema (Zod validation)
            CreateItem // Finally, handle the creation logic
        );
    }
    
    if (RemoveItem) router.delete(`/${entity}/:id`,authMiddleware(hasPermissions('HIGH')), RemoveItem);
    if (UpdateItem) {
        router.put(
            `/${entity}/:id`,
            authMiddleware(hasPermissions('MEDIUM')),
            createUploadMiddleware(uploadFields),
            validate(schema),
            UpdateItem
        );
    }
}

// Entity definitions
const entities = {
    user: 'user',
    news: 'news',
    category: 'category',
    listing: 'listing',
    tool: 'tool',
    tutorial: 'tutorial',
    gptList: 'gptList',
    event: 'event',
    blog: 'blog',
    contact: 'contact',
};

// Controllers mapping
const controllers = {
    user: require('../controllers/User'),
    category: require('../controllers/category'),
    listing: require('../controllers/listing'),
    tool: require('../controllers/tool'),
    news: require('../controllers/news'),
    tutorial: require('../controllers/tutorial'),
    gptList: require('../controllers/gptlist'),
    event: require('../controllers/event'),
    blog: require('../controllers/blog'),
    contact: require('../controllers/contact'),
};

// Schemas mapping
const schemas = {
    user: require('../validators/Schemas').Userschema,
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

// Upload fields mapping
const uploadFields = {
    category: [{ name: 'icon', maxCount: 1 }],
    listing: [{name: 'icon', maxCount: 1}],
    tool: [{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 2 }],
    news: [{ name: 'icon', maxCount: 1 }],
    tutorial: [],
    gptList: [],
    event: [],
    blog: [{ name: 'image', maxCount: 1 }],
    contact: [], // No upload fields for 'contact'
    user:[]
};

// Generate routes for all entities dynamically
for (const entity in entities) {
    const uploadField = uploadFields[entity];
    generateRoutes(entities[entity], controllers[entity], schemas[entity], uploadField);
}

module.exports = router;
