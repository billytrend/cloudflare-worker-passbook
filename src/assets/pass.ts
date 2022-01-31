import { PassProps } from "passkit-generator";

export const pass: PassProps = {
    "formatVersion": 1,
    "passTypeIdentifier": PASS_TYPE_IDENTIFIER,
    "teamIdentifier": TEAM_IDENTIFIER,
    "organizationName": "Hello World",
    "description": "Hello World",
    "generic": {
        "primaryFields": [
            {
                "key": "primary",
                "label": "Hello World",
                "value": "Hello World",
            }
        ],
        "headerFields": [],
        "backFields": [],
        "secondaryFields": [],
        "auxiliaryFields": [],
    }
};