/**
 * ============================================================================
 * CENTRALIZED DATABASE CONFIGURATION
 * ============================================================================
 * Update host, ports, databases, and credentials here in ONE place.
 * All migration scripts import from this module.
 * ============================================================================
 */

const { types } = require('pg');
// Configure node-postgres to parse PostgreSQL DATE (OID 1082) and TIMESTAMP (OID 1114, 1184)
// as raw strings to avoid local/UTC timezone shifts (preventing 1-day-before saving bugs).
types.setTypeParser(1082, val => val);
types.setTypeParser(1114, val => val);
types.setTypeParser(1184, val => val);

// #Ranchi SOURCE DATABASE PROPERTY
const SOURCE_PROPERTY_RANCHI_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_rmc_property',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
//  SUDA SOURCE DATABASE PROPERTY
const SOURCE_PROPERTY_SUDA_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_property_suda_restore',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
// DHANBAD SOURCE DATABASE PROPERTY
const SOURCE_PROPERTY_DHANBAD_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_property_dhanbad',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};



// #Ranchi SOURCE DATABASE WATER #################
const SOURCE_WATER_RANCHI_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_rmc_water',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
//  SUDA SOURCE DATABASE WATER
const SOURCE_WATER_SUDA_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_water',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
// DHANBAD SOURCE DATABASE WATER
const SOURCE_WATER_DHANBAD_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_water_dhanbad',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};



// #Ranchi SOURCE DATABASE TRADE #################
const SOURCE_TRADE_RANCHI_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_rmc_trade',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
//  SUDA SOURCE DATABASE TRADE
const SOURCE_TRADE_SUDA_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'juidco_trade_dhanbad',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};
// DHANBAD SOURCE DATABASE TRADE
const SOURCE_TRADE_DHANBAD_CONFIG = {
  host: process.env.SOURCE_DB_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_DB_PORT || '5432', 10),
  database: process.env.SOURCE_DB_NAME || 'db_trade',
  user: process.env.SOURCE_DB_USER || 'postgres',
  password: process.env.SOURCE_DB_PASSWORD || 'root'
};



// MASETER SOURCE DATABASE 
const SOURCE_MASTER_CONFIG = {
  host: process.env.SOURCE_MASTER_HOST || '172.18.1.58',
  port: parseInt(process.env.SOURCE_MASTER_PORT || '5432', 10),
  database: process.env.SOURCE_MASTER_NAME || 'db_system',
  user: process.env.SOURCE_MASTER_USER || 'postgres',
  password: process.env.SOURCE_MASTER_PASSWORD || 'root'
};

module.exports = {
  SOURCE_TRADE_RANCHI_CONFIG,
  SOURCE_TRADE_SUDA_CONFIG,
  SOURCE_TRADE_DHANBAD_CONFIG,
  SOURCE_WATER_RANCHI_CONFIG,
  SOURCE_WATER_SUDA_CONFIG,
  SOURCE_WATER_DHANBAD_CONFIG,
  SOURCE_PROPERTY_RANCHI_CONFIG,
  SOURCE_PROPERTY_SUDA_CONFIG,
  SOURCE_PROPERTY_DHANBAD_CONFIG,
  SOURCE_MASTER_CONFIG,
};
