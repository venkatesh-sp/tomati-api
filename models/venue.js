import Model from './model';
import models from '../models'

export default class Venue extends Model {
    static get tableName () {
      return 'venues'
    }
  
    static get relationMappings () {
      return {
        location: {
            relation: Model.BelongsToOneRelation,
            modelClass: models.Client,
            join: {
              from: 'venues.created_by',
              to: 'clients.id'
            }
        },
      }
    }
  }