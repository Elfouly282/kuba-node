const fs = require('fs');
const path = require('path');

const colPath = path.join(__dirname, '..', 'postman', 'Kuba.postman_collection.json');
const col = JSON.parse(fs.readFileSync(colPath, 'utf8'));

// 1. Update collection variables
col.variable = [
  {
    key: 'baseUrl',
    value: 'https://kuba-app.com/api/v1',
    type: 'string',
    description: 'API base URL (Production: https://kuba-app.com/api/v1 | Local: http://localhost:3000/api/v1)'
  },
  {
    key: 'token',
    value: '',
    type: 'string',
    description: 'JWT — set automatically after login / signup'
  },
  {
    key: 'resetToken',
    value: '',
    type: 'string',
    description: 'Reset token — set automatically after verify-reset-otp'
  },
  {
    key: 'cityId',
    value: '6ad616031ddbe497b5dd4416',
    type: 'string',
    description: 'City ID (Sahl Hasheesh: 6ad616031ddbe497b5dd4416)'
  }
];

// 2. Define Cities Folder
const citiesFolder = {
  name: 'Cities',
  description: 'Endpoints for managing and viewing main destination cities (e.g., Sahl Hasheesh, North Coast, Sharm El Sheikh). Each city can have polygon zone boundaries, center, and contains multiple sub-regions/areas.',
  item: [
    {
      name: 'Get All Cities',
      request: {
        method: 'GET',
        header: [],
        url: {
          raw: '{{baseUrl}}/cities',
          host: ['{{baseUrl}}'],
          path: ['cities'],
          query: [
            {
              key: 'active',
              value: 'true',
              description: 'Filter by active status (true/false)',
              disabled: true
            }
          ]
        },
        description: 'Returns all cities with their images, colors, centers, points, and regions count.'
      }
    },
    {
      name: 'Get One City',
      request: {
        method: 'GET',
        header: [],
        url: {
          raw: '{{baseUrl}}/cities/:id',
          host: ['{{baseUrl}}'],
          path: ['cities', ':id'],
          variable: [
            {
              key: 'id',
              value: '{{cityId}}',
              description: 'City ObjectId (e.g. Sahl Hasheesh: 6ad616031ddbe497b5dd4416)'
            }
          ]
        },
        description: 'Returns details of a single city including its zone points, center, and regions count.'
      }
    },
    {
      name: 'Get City Regions (Sub-Areas)',
      request: {
        method: 'GET',
        header: [],
        url: {
          raw: '{{baseUrl}}/cities/:id/regions',
          host: ['{{baseUrl}}'],
          path: ['cities', ':id', 'regions'],
          variable: [
            {
              key: 'id',
              value: '{{cityId}}',
              description: 'City ObjectId'
            }
          ],
          query: [
            {
              key: 'active',
              value: 'true',
              disabled: true
            }
          ]
        },
        description: 'Returns all sub-regions/areas belonging to this city (e.g., Jamaran, Azzurra, Old Town, Al Saraya, Al Andalous, Al Qasr, Piazza).'
      }
    },
    {
      name: 'Get City Screen Data',
      request: {
        method: 'GET',
        header: [],
        url: {
          raw: '{{baseUrl}}/cities/:id/data?position=top',
          host: ['{{baseUrl}}'],
          path: ['cities', ':id', 'data'],
          variable: [
            {
              key: 'id',
              value: '{{cityId}}',
              description: 'City ObjectId (or pass in query ?cityId=...)'
            }
          ],
          query: [
            {
              key: 'position',
              value: 'top',
              description: 'Filter banners by position: top, center, bottom'
            }
          ]
        },
        description: 'Returns aggregated data for the City screen: city details, list of sub-regions inside the city, city-specific banners, chalets, all advertisements, and categories.'
      }
    },
    {
      name: 'Get All Cities (Admin)',
      request: {
        method: 'GET',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/cities',
          host: ['{{baseUrl}}'],
          path: ['admin', 'cities']
        },
        description: 'Admin only. Returns all cities with their zones, order, and sub-regions count.'
      }
    },
    {
      name: 'Get One City (Admin)',
      request: {
        method: 'GET',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/cities/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'cities', ':id'],
          variable: [
            {
              key: 'id',
              value: '{{cityId}}'
            }
          ]
        },
        description: 'Admin only. Returns one city by ID.'
      }
    },
    {
      name: 'Create City (with Zone)',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/cities',
          host: ['{{baseUrl}}'],
          path: ['admin', 'cities']
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            name: 'الساحل الشمالي',
            order: 1,
            active: true,
            color: '#2D4F2E',
            points: [
              { latitude: 30.985, longitude: 28.95 },
              { latitude: 31.05, longitude: 29.15 },
              { latitude: 30.85, longitude: 29.25 },
              { latitude: 30.75, longitude: 29.05 }
            ]
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: 'Admin only. Creates a new city with an optional geofenced polygon zone.'
      }
    },
    {
      name: 'Update City (with Zone)',
      request: {
        method: 'PATCH',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/cities/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'cities', ':id'],
          variable: [
            {
              key: 'id',
              value: '{{cityId}}'
            }
          ]
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            name: 'سهل حشيش',
            color: '#2D4F2E',
            active: true
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: 'Admin only. Update city details or polygon points.'
      }
    },
    {
      name: 'Delete City',
      request: {
        method: 'DELETE',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/cities/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'cities', ':id'],
          variable: [
            {
              key: 'id',
              value: '<CITY_ID>'
            }
          ]
        },
        description: 'Admin only. Deletes a city.'
      }
    }
  ]
};

// 3. Update Auth Flow 4 with Select City
const authFolder = col.item.find(i => i.name === 'Auth');
if (authFolder) {
  const flow4 = authFolder.item.find(i => i.name.includes('Flow 4'));
  if (flow4) {
    const existingSelectCityIndex = flow4.item.findIndex(i => i.name.includes('Select City'));
    const selectCityItem = {
      name: 'Select City (Favorite City)',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}'
          }
        ],
        url: {
          raw: '{{baseUrl}}/auth/select-city',
          host: ['{{baseUrl}}'],
          path: ['auth', 'select-city']
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            cityId: '{{cityId}}'
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: "Saves the user's selected/favorite city. Supports cityId in body or query param."
      }
    };

    if (existingSelectCityIndex >= 0) {
      flow4.item[existingSelectCityIndex] = selectCityItem;
    } else {
      const selectRegIndex = flow4.item.findIndex(i => i.name.includes('Select Region'));
      if (selectRegIndex >= 0) {
        flow4.item.splice(selectRegIndex, 0, selectCityItem);
      } else {
        flow4.item.push(selectCityItem);
      }
    }
  }
}

// 4. Update Regions folder
const regionsFolder = col.item.find(i => i.name === 'Regions');
if (regionsFolder) {
  regionsFolder.description = 'Endpoints for sub-regions and areas (e.g. Jamaran, Azzurra, Old Town) belonging to a parent City (e.g. Sahl Hasheesh).';
  
  // Update Get All Regions to include city query param
  const getAllReg = regionsFolder.item.find(i => i.name === 'Get All Regions');
  if (getAllReg) {
    if (!getAllReg.request.url.query) getAllReg.request.url.query = [];
    const hasCityQuery = getAllReg.request.url.query.some(q => q.key === 'city');
    if (!hasCityQuery) {
      getAllReg.request.url.query.push({
        key: 'city',
        value: '{{cityId}}',
        description: 'Filter regions by parent City ID (e.g. Sahl Hasheesh)',
        disabled: false
      });
      getAllReg.request.url.raw = '{{baseUrl}}/regions?city={{cityId}}';
    }
  }

  // Update Create Region to include city in sample body
  const createReg = regionsFolder.item.find(i => i.name === 'Create Region (zone)');
  if (createReg && createReg.request && createReg.request.body) {
    createReg.request.body.raw = JSON.stringify({
      name: 'منطقة جمران',
      city: '6ad616031ddbe497b5dd4416',
      order: 0,
      active: true,
      color: '#2D4F2E',
      points: [
        { latitude: 27.045, longitude: 33.885 },
        { latitude: 27.045, longitude: 33.895 },
        { latitude: 27.038, longitude: 33.895 },
        { latitude: 27.038, longitude: 33.885 }
      ]
    }, null, 2);
  }

  // Add Delete Region
  if (!regionsFolder.item.find(i => i.name === 'Delete Region')) {
    regionsFolder.item.push({
      name: 'Delete Region',
      request: {
        method: 'DELETE',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/regions/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'regions', ':id'],
          variable: [
            {
              key: 'id',
              value: '<REGION_ID>'
            }
          ]
        },
        description: 'Admin only. Deletes a region.'
      }
    });
  }
}

// 5. Update Advertisements folder
const adsFolder = col.item.find(i => i.name === 'Advertisements');
if (adsFolder) {
  const getAllAds = adsFolder.item.find(i => i.name === 'Get All Advertisements');
  if (getAllAds) {
    getAllAds.request.url.query = [
      {
        key: 'city',
        value: '{{cityId}}',
        description: 'Filter advertisements by City ID (e.g. Sahl Hasheesh)',
        disabled: false
      },
      {
        key: 'region',
        value: '<REGION_ID>',
        description: 'Filter advertisements by Region ID',
        disabled: true
      },
      {
        key: 'type',
        value: 'chalet',
        description: 'Filter by advertisement type (chalet, apartment, villa, etc.)',
        disabled: true
      },
      {
        key: 'search',
        value: '',
        description: 'Search in title, location, and address',
        disabled: true
      },
      {
        key: 'category',
        value: '<CATEGORY_ID>',
        description: 'Filter by Category ID',
        disabled: true
      },
      {
        key: 'active',
        value: 'true',
        description: 'Filter active status',
        disabled: true
      }
    ];
    getAllAds.request.url.raw = '{{baseUrl}}/advertisements?city={{cityId}}';
  }

  // Add Create Advertisement
  if (!adsFolder.item.find(i => i.name === 'Create Advertisement (Admin)')) {
    adsFolder.item.push({
      name: 'Create Advertisement (Admin)',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/advertisements',
          host: ['{{baseUrl}}'],
          path: ['admin', 'advertisements']
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            title: 'شاليه فاخر بإطلالة مباشرة على البحر',
            category: '<CATEGORY_ID>',
            city: '6ad616031ddbe497b5dd4416',
            region: '<REGION_ID>',
            unitType: '<UNIT_TYPE_ID>',
            price: 3500,
            pricing: {
              basePrice: 3500,
              pricingUnit: 'per_night',
              discountType: 'percentage',
              discountValue: 10
            },
            location: 'سهل حشيش - منطقة جمران',
            address: 'طريق الكورنيش، سهل حشيش',
            latitude: 27.041086,
            longitude: 33.891272,
            description: 'شاليه أنيق مفروش بالكامل داخل سهل حشيش، يحتوي على حمام سباحة خاص وتراس بانورامي على البحر.',
            active: true
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: 'Admin only. Creates an advertisement. Automatically links to city and region, or auto-detects them if inside polygon zones.'
      }
    });
  }

  // Add Update Advertisement
  if (!adsFolder.item.find(i => i.name === 'Update Advertisement (Admin)')) {
    adsFolder.item.push({
      name: 'Update Advertisement (Admin)',
      request: {
        method: 'PATCH',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/advertisements/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'advertisements', ':id'],
          variable: [
            {
              key: 'id',
              value: '<ADVERTISEMENT_ID>'
            }
          ]
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            city: '6ad616031ddbe497b5dd4416',
            price: 4000,
            active: true
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: 'Admin only. Update advertisement fields.'
      }
    });
  }

  // Add Delete Advertisement
  if (!adsFolder.item.find(i => i.name === 'Delete Advertisement (Admin)')) {
    adsFolder.item.push({
      name: 'Delete Advertisement (Admin)',
      request: {
        method: 'DELETE',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin Bearer token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/advertisements/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'advertisements', ':id'],
          variable: [
            {
              key: 'id',
              value: '<ADVERTISEMENT_ID>'
            }
          ]
        },
        description: 'Admin only. Deletes an advertisement.'
      }
    });
  }
}

// 6. Update Banners (in Home)
const homeFolder = col.item.find(i => i.name === 'Home');
if (homeFolder) {
  const getBanners = homeFolder.item.find(i => i.name === 'Get All Banners');
  if (getBanners) {
    getBanners.request.url.query = [
      {
        key: 'city',
        value: '{{cityId}}',
        description: 'Filter banners by City ID (e.g. Sahl Hasheesh)',
        disabled: false
      },
      {
        key: 'region',
        value: '<REGION_ID>',
        description: 'Filter banners by Region ID',
        disabled: true
      },
      {
        key: 'position',
        value: 'top',
        description: 'Filter by position (top, center, bottom)',
        disabled: true
      }
    ];
    getBanners.request.url.raw = '{{baseUrl}}/banners?city={{cityId}}';
  }

  // Add Admin Banner endpoints
  if (!homeFolder.item.find(i => i.name === 'Create Banner (Admin)')) {
    homeFolder.item.push({
      name: 'Create Banner (Admin)',
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          },
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/banners',
          host: ['{{baseUrl}}'],
          path: ['admin', 'banners']
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            advertisementId: '<ADVERTISEMENT_ID>',
            position: 'top',
            city: '6ad616031ddbe497b5dd4416',
            region: null,
            image: 'https://example.com/banner.jpg'
          }, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        },
        description: 'Admin only. Creates a banner linked to an advertisement and optionally to a city or region.'
      }
    });
  }

  if (!homeFolder.item.find(i => i.name === 'Delete Banner (Admin)')) {
    homeFolder.item.push({
      name: 'Delete Banner (Admin)',
      request: {
        method: 'DELETE',
        header: [
          {
            key: 'Authorization',
            value: 'Bearer {{token}}',
            description: 'Admin token'
          }
        ],
        url: {
          raw: '{{baseUrl}}/admin/banners/:id',
          host: ['{{baseUrl}}'],
          path: ['admin', 'banners', ':id'],
          variable: [
            {
              key: 'id',
              value: '<BANNER_ID>'
            }
          ]
        },
        description: 'Admin only. Deletes a banner.'
      }
    });
  }
}

// 7. Insert Cities folder right before Regions folder
const regIndex = col.item.findIndex(i => i.name === 'Regions');
const existingCitiesIndex = col.item.findIndex(i => i.name === 'Cities');
if (existingCitiesIndex >= 0) {
  col.item.splice(existingCitiesIndex, 1);
}
col.item.splice(regIndex >= 0 ? regIndex : col.item.length, 0, citiesFolder);

// Keep this collection for the mobile user only.
const isAdminRequest = (item) => {
  const name = item.name || '';
  if (/admin/i.test(name)) return true;
  const url = item.request && item.request.url;
  const raw = !url ? '' : (typeof url === 'string' ? url : (url.raw || ''));
  if (/\/admin(\/|\?|$)/i.test(raw)) return true;
  const parts = url && url.path;
  if (Array.isArray(parts) && parts.some((part) => String(part).toLowerCase() === 'admin')) return true;
  return /admin only/i.test((item.request && item.request.description) || '');
};

const keepUserRequests = (items) => (items || [])
  .filter((item) => !isAdminRequest(item))
  .map((item) => (Array.isArray(item.item) ? { ...item, item: keepUserRequests(item.item) } : item))
  .filter((item) => !Array.isArray(item.item) || item.item.length > 0);

col.item = keepUserRequests(col.item);

// Write updated collection
fs.writeFileSync(colPath, JSON.stringify(col, null, 2) + '\n', 'utf8');
console.log('Kuba.postman_collection.json updated successfully!');

// 8. Also generate environment files for easy switching:
// Local Environment
const localEnv = {
  id: "kuba-env-local",
  name: "Kuba - Local Environment",
  values: [
    {
      key: "baseUrl",
      value: "http://localhost:3000/api/v1",
      type: "default",
      enabled: true
    },
    {
      key: "token",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "resetToken",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "cityId",
      value: "6ad616031ddbe497b5dd4416",
      type: "default",
      enabled: true
    }
  ],
  _postman_variable_scope: "environment"
};

// Production Environment
const prodEnv = {
  id: "kuba-env-prod",
  name: "Kuba - Production Environment",
  values: [
    {
      key: "baseUrl",
      value: "https://kuba-app.com/api/v1",
      type: "default",
      enabled: true
    },
    {
      key: "token",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "resetToken",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "cityId",
      value: "6ad616031ddbe497b5dd4416",
      type: "default",
      enabled: true
    }
  ],
  _postman_variable_scope: "environment"
};

const envDir = path.join(__dirname, '..', 'postman');
fs.writeFileSync(path.join(envDir, 'Kuba_Local.postman_environment.json'), JSON.stringify(localEnv, null, 2), 'utf8');
fs.writeFileSync(path.join(envDir, 'Kuba_Production.postman_environment.json'), JSON.stringify(prodEnv, null, 2), 'utf8');

console.log('Environment files generated:');
console.log('  - Kuba_Local.postman_environment.json');
console.log('  - Kuba_Production.postman_environment.json');
