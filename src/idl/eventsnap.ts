/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/eventsnap.json`.
 */
export type Eventsnap = {
  "address": "J9dhGEXi4C9LzSgvBz2T7sAihNU4bYjFngaKme9vSvHo",
  "metadata": {
    "name": "eventsnap",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "signer": true
        },
        {
          "name": "programData",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uid",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "banner",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteEvent",
      "discriminator": [
        103,
        111,
        95,
        106,
        232,
        24,
        190,
        84
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "programData",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "deleteImage",
      "discriminator": [
        196,
        158,
        176,
        208,
        221,
        127,
        46,
        248
      ],
      "accounts": [
        {
          "name": "userData",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "imageIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "getAllEvents",
      "discriminator": [
        224,
        53,
        176,
        39,
        120,
        138,
        187,
        18
      ],
      "accounts": [
        {
          "name": "programData",
          "writable": true
        },
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [],
      "returns": {
        "vec": {
          "defined": {
            "name": "event"
          }
        }
      }
    },
    {
      "name": "getUserImagesByEvent",
      "discriminator": [
        40,
        42,
        253,
        150,
        210,
        137,
        54,
        157
      ],
      "accounts": [
        {
          "name": "userData",
          "writable": true
        },
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [],
      "returns": {
        "vec": {
          "defined": {
            "name": "uploadedImage"
          }
        }
      }
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "programData",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "oracle",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "joinEvent",
      "discriminator": [
        10,
        93,
        234,
        137,
        237,
        194,
        224,
        0
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "userData",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "uploadImageWithTag",
      "discriminator": [
        250,
        85,
        172,
        120,
        239,
        134,
        184,
        93
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "userData",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "tag",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "discriminator": [
        125,
        192,
        125,
        158,
        9,
        115,
        152,
        233
      ]
    },
    {
      "name": "programData",
      "discriminator": [
        211,
        243,
        91,
        186,
        23,
        190,
        190,
        4
      ]
    },
    {
      "name": "userData",
      "discriminator": [
        139,
        248,
        167,
        203,
        253,
        220,
        210,
        221
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "uidTooLong",
      "msg": "Event UID must be 32 characters or less"
    },
    {
      "code": 6001,
      "name": "nameTooLong",
      "msg": "Event name must be 50 characters or less"
    },
    {
      "code": 6002,
      "name": "urlTooLong",
      "msg": "URL must be 200 characters or less"
    },
    {
      "code": 6003,
      "name": "tagTooLong",
      "msg": "Tag must be 50 characters or less"
    },
    {
      "code": 6004,
      "name": "alreadyJoined",
      "msg": "User has already joined this event"
    },
    {
      "code": 6005,
      "name": "notJoined",
      "msg": "User must join event before uploading images"
    },
    {
      "code": 6006,
      "name": "invalidImageIndex",
      "msg": "Invalid image index"
    },
    {
      "code": 6007,
      "name": "unauthorizedDeletion",
      "msg": "Only event owner can delete the event"
    },
    {
      "code": 6008,
      "name": "eventCountOverflow",
      "msg": "Event count overflow"
    },
    {
      "code": 6009,
      "name": "eventCountUnderflow",
      "msg": "Event count underflow"
    },
    {
      "code": 6010,
      "name": "maxAttendeesReached",
      "msg": "Maximum number of attendees reached"
    },
    {
      "code": 6011,
      "name": "maxImagesReached",
      "msg": "Maximum number of images reached"
    }
  ],
  "types": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uid",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "banner",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "attendees",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "highlightImages",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "programData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "oracle",
            "type": "pubkey"
          },
          {
            "name": "eventCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "uploadedImage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "tag",
            "type": "string"
          },
          {
            "name": "uploader",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "userData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uploaderSelfie",
            "type": "string"
          },
          {
            "name": "isJoined",
            "type": "bool"
          },
          {
            "name": "images",
            "type": {
              "vec": {
                "defined": {
                  "name": "uploadedImage"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
