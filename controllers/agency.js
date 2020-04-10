import models from '../models'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import async from 'async'
import fetch from 'node-fetch';
import queryString from 'query-string';

import { } from './mailling';

// GET - Get a list of agencies
const getAgencies = async (req, res, next) => {

    try {

        // Get the Brand of the client
        const client_collaborator = 
            await models.ClientCollaborator.query()
                .where('account_id', req.account_id);

        if (!client_collaborator[0]) return res.status(400).send({msg: 'Brand Collaborator does not exist'});
    
        // Get Client agencies
        const brands = 
            await models.Agency.query()
                .where('invited_by', client_collaborator[0].client_id);

        // Send the clients */
        return res.status(201).json(brands).send();

    } catch (e) {
        console.log(e);
        return res.status(500).json(JSON.stringify(e)).send();
    }
}


// POST - Create a new Agency organization and send an email to the owner
const inviteAgency = async (req, res, next) => {
    try {
        /* Todo add client organization logic 
        const {name, description, owner_email} = req.body;

        // Create client
        const client = 
            await models.Client.query()
                .insert({
                    name, 
                    description, 
                    contact_email: owner_email,
                })

        // Create new token to validate owner email
        const new_token = 
            await models.Token.query().insert({
                email: owner_email,
                token: crypto.randomBytes(16).toString('hex')
            })

        // TODO send invite email
        await clientInviteEmail(owner_email, new_token);

        return res.status(201).json(client).send(); */
    } catch (e) {
        console.log(e);
        return res.status(500).json(JSON.stringify(e)).send();
    }
}

const agencyController = {
    // Client
    getAgencies,
    inviteAgency
}

export default agencyController;