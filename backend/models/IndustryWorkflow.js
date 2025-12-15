import mongoose from 'mongoose';

const industryWorkflowSchema = new mongoose.Schema({
  industry: {
    type: String,
    enum: ['tattoo', 'medical_aesthetics', 'spa_wellness', 'barbershop', 'nails', 'massage', 'physiotherapy', 'generic'],
    required: true
  },
  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon',
    required: true
  },
  enabled: {
    type: Boolean,
    default: false
  },
  config: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  features: [{
    type: String,
    enum: [
      'multi_session',
      'progress_tracking',
      'consents',
      'packages',
      'memberships',
      'upsells',
      'photo_gallery',
      'portfolio',
      'treatment_plans',
      'recurring_billing',
      'credit_system',
      'gift_cards',
      'follow_ups',
      'body_mapping',
      'medication_tracking',
      'hipaa_compliance'
    ]
  }],
  displayName: String,
  description: String,
  icon: String
}, {
  timestamps: true
});

// Indexes
industryWorkflowSchema.index({ salonId: 1, industry: 1 }, { unique: true });
industryWorkflowSchema.index({ enabled: 1 });
industryWorkflowSchema.index({ salonId: 1, enabled: 1 });

// Virtual: active features count
industryWorkflowSchema.virtual('activeFeatureCount').get(function() {
  return this.features ? this.features.length : 0;
});

// Methods
industryWorkflowSchema.methods.enable = async function() {
  this.enabled = true;
  await this.save();
  return this;
};

industryWorkflowSchema.methods.disable = async function() {
  this.enabled = false;
  await this.save();
  return this;
};

industryWorkflowSchema.methods.addFeature = async function(feature) {
  if (!this.features.includes(feature)) {
    this.features.push(feature);
    await this.save();
  }
  return this;
};

industryWorkflowSchema.methods.removeFeature = async function(feature) {
  this.features = this.features.filter(f => f !== feature);
  await this.save();
  return this;
};

industryWorkflowSchema.methods.updateConfig = async function(configUpdates) {
  Object.entries(configUpdates).forEach(([key, value]) => {
    this.config.set(key, value);
  });
  await this.save();
  return this;
};

// Statics
industryWorkflowSchema.statics.getAvailableIndustries = function() {
  return [
    {
      id: 'tattoo',
      name: 'Tattoo Studio',
      icon: 'Ã°Å¸Å½Â¨',
      description: 'Multi-Session-Projekte mit Progress-Tracking, Portfolio-Galerie',
      defaultFeatures: ['multi_session', 'progress_tracking', 'consents', 'photo_gallery', 'portfolio', 'body_mapping']
    },
    {
      id: 'medical_aesthetics',
      name: 'Medical Aesthetics',
      icon: 'Ã°Å¸â€™â€°',
      description: 'Botox, Filler, Treatment-Plans mit Follow-ups',
      defaultFeatures: ['treatment_plans', 'consents', 'photo_gallery', 'follow_ups', 'medication_tracking', 'hipaa_compliance']
    },
    {
      id: 'spa_wellness',
      name: 'Spa & Wellness',
      icon: 'Ã°Å¸Â§â€“',
      description: 'Packages, Memberships, Credit-System',
      defaultFeatures: ['packages', 'memberships', 'credit_system', 'gift_cards', 'upsells', 'recurring_billing']
    },
    {
      id: 'barbershop',
      name: 'Barbershop',
      icon: 'Ã°Å¸â€™Ë†',
      description: 'Memberships, Upsells, Loyalty-System',
      defaultFeatures: ['memberships', 'upsells', 'packages']
    },
    {
      id: 'nails',
      name: 'Nail Studio',
      icon: 'Ã°Å¸â€™â€¦',
      description: 'Packages, Photo-Gallery, Upsells',
      defaultFeatures: ['packages', 'photo_gallery', 'portfolio', 'upsells']
    },
    {
      id: 'massage',
      name: 'Massage Therapy',
      icon: 'Ã°Å¸â€™â€ ',
      description: 'Treatment-Plans, Packages, Follow-ups',
      defaultFeatures: ['treatment_plans', 'packages', 'follow_ups']
    },
    {
      id: 'physiotherapy',
      name: 'Physiotherapie',
      icon: 'Ã°Å¸Â©Âº',
      description: 'Treatment-Plans, Progress-Tracking, Follow-ups',
      defaultFeatures: ['treatment_plans', 'progress_tracking', 'follow_ups', 'consents']
    },
    {
      id: 'generic',
      name: 'Andere Branche',
      icon: 'Ã°Å¸ÂÂª',
      description: 'Flexible Workflows fÃƒÂ¼r alle Branchen',
      defaultFeatures: ['packages', 'upsells']
    }
  ];
};

industryWorkflowSchema.statics.getSalonWorkflows = async function(salonId, onlyEnabled = false) {
  const query = { salonId };
  if (onlyEnabled) {
    query.enabled = true;
  }
  return this.find(query).sort({ createdAt: -1 });
};

industryWorkflowSchema.statics.enableWorkflow = async function(salonId, industry, features = null) {
  const availableIndustries = this.getAvailableIndustries();
  const industryConfig = availableIndustries.find(i => i.id === industry);

  if (!industryConfig) {
    throw new Error(`Invalid industry: ${industry}`);
  }

  let workflow = await this.findOne({ salonId, industry });

  if (!workflow) {
    workflow = new this({
      salonId,
      industry,
      enabled: true,
      features: features || industryConfig.defaultFeatures,
      displayName: industryConfig.name,
      description: industryConfig.description,
      icon: industryConfig.icon
    });
  } else {
    workflow.enabled = true;
    if (features) {
      workflow.features = features;
    }
  }

  await workflow.save();
  return workflow;
};

industryWorkflowSchema.statics.hasFeature = async function(salonId, industry, feature) {
  const workflow = await this.findOne({ salonId, industry, enabled: true });
  return workflow ? workflow.features.includes(feature) : false;
};

const IndustryWorkflow = mongoose.model('IndustryWorkflow', industryWorkflowSchema);

export default IndustryWorkflow;
