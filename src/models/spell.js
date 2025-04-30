const mongoose = require("mongoose");

const spellSchema = new mongoose.Schema({
    id:        { type: Number, index: true, unique: true },
    name:      { type: String, index: "text" },          // text index for name search
    source:    String,
    isFree:    Boolean,
    page:      Number,
    url:       String,
    rulesVersion: String,
    level:     Number,
    school:    String,
    classes:   [String],
    subclasses: [String],
    casttime:  String,
    range:     String,
    components:String,
    duration:  String,
    description: String,
    ritual:    Boolean,
    higherLevels: [String],
    concentration: Boolean,
    automation: [JSON]

    // … you can either enumerate all fields or:
}, { strict: false });

module.exports = mongoose.model("Spell", spellSchema);
