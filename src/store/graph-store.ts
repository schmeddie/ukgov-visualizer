import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { NodeData, LinkData, EntityType, GraphData } from "@/types/graph";

function staffToVal(staffCount: number): number {
  if (staffCount <= 0) return 2;
  return Math.max(2, Math.log10(staffCount) * 3);
}

function n(
  label: string,
  type: EntityType,
  staffCount: number,
  description: string,
  websiteUrl: string = "#"
): NodeData {
  return {
    id: uuidv4(),
    label,
    type,
    val: staffToVal(staffCount),
    headOfEntity: "PLACEHOLDER",
    budget: "PLACEHOLDER",
    staffCount,
    description,
    websiteUrl,
  };
}

function createSeedData(): GraphData {
  // ========== MINISTERIAL DEPARTMENTS ==========
  const cabinetOffice = n("Cabinet Office", "Ministerial Department", 8930,
    "Supports the Prime Minister and ensures the effective running of government.",
    "https://www.gov.uk/government/organisations/cabinet-office");

  const hmTreasury = n("HM Treasury", "Ministerial Department", 2100,
    "The government's economic and finance ministry, maintaining control over public spending.",
    "https://www.gov.uk/government/organisations/hm-treasury");

  const homeOffice = n("Home Office", "Ministerial Department", 36000,
    "The lead government department for immigration, passports, drugs policy, crime, counter-terrorism and police.",
    "https://www.gov.uk/government/organisations/home-office");

  const mod = n("Ministry of Defence", "Ministerial Department", 57000,
    "Protects the security, independence and interests of the UK at home and abroad.",
    "https://www.gov.uk/government/organisations/ministry-of-defence");

  const dfe = n("Department for Education", "Ministerial Department", 7200,
    "Responsible for children's services and education in England.",
    "https://www.gov.uk/government/organisations/department-for-education");

  const dhsc = n("Department of Health & Social Care", "Ministerial Department", 3200,
    "Responsible for government policy on health and adult social care in England.",
    "https://www.gov.uk/government/organisations/department-of-health-and-social-care");

  const fcdo = n("Foreign, Commonwealth & Development Office", "Ministerial Department", 17000,
    "Pursues the UK's national interests and projects the UK as a force for good in the world.",
    "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office");

  const moj = n("Ministry of Justice", "Ministerial Department", 87000,
    "Major government department responsible for the justice system, courts, prisons and probation services.",
    "https://www.gov.uk/government/organisations/ministry-of-justice");

  const defra = n("Dept for Environment, Food & Rural Affairs", "Ministerial Department", 6300,
    "Responsible for environmental protection, food production and standards, agriculture, fisheries and rural communities.",
    "https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs");

  const dft = n("Department for Transport", "Ministerial Department", 4500,
    "Works with agencies and partners to support the transport network and plan and invest in transport infrastructure.",
    "https://www.gov.uk/government/organisations/department-for-transport");

  const dbt = n("Department for Business & Trade", "Ministerial Department", 4800,
    "Responsible for business, industrial strategy, trade, and investment.",
    "https://www.gov.uk/government/organisations/department-for-business-and-trade");

  const dluhc = n("Dept for Levelling Up, Housing & Communities", "Ministerial Department", 3600,
    "Supports communities across the UK and drives levelling up, housing and local government policy.",
    "https://www.gov.uk/government/organisations/department-for-levelling-up-housing-and-communities");

  const dwp = n("Department for Work & Pensions", "Ministerial Department", 85000,
    "Responsible for welfare, pensions and child maintenance policy. The UK's biggest public service department.",
    "https://www.gov.uk/government/organisations/department-for-work-pensions");

  const dcms = n("Dept for Culture, Media & Sport", "Ministerial Department", 1500,
    "Drives growth, enriches lives and promotes the UK internationally through culture, media, sport, tourism and civil society.",
    "https://www.gov.uk/government/organisations/department-for-culture-media-and-sport");

  const desnz = n("Dept for Energy Security & Net Zero", "Ministerial Department", 5600,
    "Securing our long term energy supply, bringing down bills and halving inflation.",
    "https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero");

  const dsit = n("Dept for Science, Innovation & Technology", "Ministerial Department", 3800,
    "Driving innovation that will deliver improved public services, create new better-paid jobs and grow the economy.",
    "https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology");

  const nio = n("Northern Ireland Office", "Ministerial Department", 150,
    "Supports the Secretary of State for Northern Ireland in promoting the best interests of Northern Ireland within a stronger United Kingdom.",
    "https://www.gov.uk/government/organisations/northern-ireland-office");

  const scotlandOffice = n("Office of the Secretary of State for Scotland", "Ministerial Department", 80,
    "Represents Scottish interests within the UK Government and the UK Government's interests in Scotland.",
    "https://www.gov.uk/government/organisations/office-of-the-secretary-of-state-for-scotland");

  const walesOffice = n("Office of the Secretary of State for Wales", "Ministerial Department", 60,
    "Ensures the smooth working of the devolution settlement in Wales.",
    "https://www.gov.uk/government/organisations/office-of-the-secretary-of-state-for-wales");

  const ago = n("Attorney General's Office", "Ministerial Department", 200,
    "Provides legal advice to the government, superintends prosecuting authorities and acts as guardian of the public interest.",
    "https://www.gov.uk/government/organisations/attorney-generals-office");

  const hmLandRegistry = n("HM Land Registry", "Ministerial Department", 6200,
    "Registers the ownership of land and property in England and Wales.",
    "https://www.gov.uk/government/organisations/land-registry");

  const co = n("UK Export Finance", "Ministerial Department", 500,
    "The UK's export credit agency, helping UK companies win overseas contracts.",
    "https://www.gov.uk/government/organisations/uk-export-finance");

  const lot = n("Leader of the House of Commons", "Ministerial Department", 30,
    "Responsible for the arrangement of government business in the House of Commons.",
    "https://www.gov.uk/government/organisations/the-office-of-the-leader-of-the-house-of-commons");

  const lol = n("Leader of the House of Lords", "Ministerial Department", 30,
    "Responsible for the arrangement of government business in the House of Lords.",
    "https://www.gov.uk/government/organisations/office-of-the-leader-of-the-house-of-lords");

  // ========== NON-MINISTERIAL DEPARTMENTS ==========
  const hmrc = n("HM Revenue & Customs", "Non-Ministerial Department", 66000,
    "Responsible for the collection of taxes, payment of some forms of state support, and administration of other regulatory regimes.",
    "https://www.gov.uk/government/organisations/hm-revenue-customs");

  const ofsted = n("Ofsted", "Non-Ministerial Department", 1700,
    "Inspects and regulates services that care for children and young people, and services providing education and skills.",
    "https://www.gov.uk/government/organisations/ofsted");

  const cps = n("Crown Prosecution Service", "Non-Ministerial Department", 6600,
    "The principal public prosecuting authority for England and Wales.",
    "https://www.gov.uk/government/organisations/crown-prosecution-service");

  const sfo = n("Serious Fraud Office", "Non-Ministerial Department", 500,
    "Investigates and prosecutes serious or complex fraud, bribery and corruption.",
    "https://www.gov.uk/government/organisations/serious-fraud-office");

  const gld = n("Government Legal Department", "Non-Ministerial Department", 2500,
    "The largest provider of legal services across government.",
    "https://www.gov.uk/government/organisations/government-legal-department");

  const nca = n("National Crime Agency", "Non-Ministerial Department", 5500,
    "Leads the UK's fight to cut serious and organised crime.",
    "https://www.gov.uk/government/organisations/national-crime-agency");

  const ofqual = n("Ofqual", "Non-Ministerial Department", 280,
    "Regulates qualifications, examinations and assessments in England.",
    "https://www.gov.uk/government/organisations/ofqual");

  const ofgem = n("Ofgem", "Non-Ministerial Department", 1100,
    "The Office of Gas and Electricity Markets, protecting the interests of energy consumers.",
    "https://www.gov.uk/government/organisations/ofgem");

  const ofwat = n("Ofwat", "Non-Ministerial Department", 350,
    "The Water Services Regulation Authority, regulating the water sector in England and Wales.",
    "https://www.gov.uk/government/organisations/ofwat");

  const ons = n("Office for National Statistics", "Non-Ministerial Department", 5200,
    "The UK's largest independent producer of official statistics and the recognised national statistical institute.",
    "https://www.gov.uk/government/organisations/office-for-national-statistics");

  const fca = n("Financial Conduct Authority", "Non-Ministerial Department", 4500,
    "Regulates the financial services industry in the UK to protect consumers and ensure market integrity.",
    "https://www.fca.org.uk/");

  const cma = n("Competition & Markets Authority", "Non-Ministerial Department", 900,
    "Promotes competition for the benefit of consumers, both within and outside the UK.",
    "https://www.gov.uk/government/organisations/competition-and-markets-authority");

  const ico = n("Information Commissioner's Office", "Non-Ministerial Department", 900,
    "The UK's independent authority set up to uphold information rights in the public interest.",
    "https://ico.org.uk/");

  const charityCom = n("Charity Commission", "Non-Ministerial Department", 400,
    "The registrar and regulator of charities in England and Wales.",
    "https://www.gov.uk/government/organisations/charity-commission");

  const forestryComm = n("Forestry Commission", "Non-Ministerial Department", 2500,
    "The government department responsible for protecting and expanding England's forests and woodlands.",
    "https://www.gov.uk/government/organisations/forestry-commission");

  const foodStandards = n("Food Standards Agency", "Non-Ministerial Department", 1400,
    "Responsible for food safety and food hygiene across the UK.",
    "https://www.gov.uk/government/organisations/food-standards-agency");

  const govActuaryDept = n("Government Actuary's Department", "Non-Ministerial Department", 200,
    "Provides actuarial analysis and advice to support government decision making.",
    "https://www.gov.uk/government/organisations/government-actuarys-department");

  const nsa = n("National Savings & Investments", "Non-Ministerial Department", 150,
    "One of the largest savings organisations in the UK, offering savings and investment products.",
    "https://www.gov.uk/government/organisations/national-savings-and-investments");

  const supremeCourt = n("Supreme Court of the United Kingdom", "Non-Ministerial Department", 50,
    "The final court of appeal in the UK for civil cases, and for criminal cases from England, Wales and Northern Ireland.",
    "https://www.supremecourt.uk/");

  const ordnanceSurvey = n("Ordnance Survey", "Non-Ministerial Department", 1200,
    "The national mapping agency for Great Britain.",
    "https://www.gov.uk/government/organisations/ordnance-survey");

  const waterServicesReg = n("The Water Services Regulation Authority", "Non-Ministerial Department", 50,
    "Economic regulator of the water and sewerage sectors in England and Wales.");

  // ========== EXECUTIVE AGENCIES ==========
  const dvla = n("DVLA", "Executive Agency", 6000,
    "Maintains registers of drivers and vehicles, and collects vehicle excise duty.",
    "https://www.gov.uk/government/organisations/driver-and-vehicle-licensing-agency");

  const borderForce = n("Border Force", "Executive Agency", 8000,
    "A law enforcement command within the Home Office, securing the UK border.",
    "https://www.gov.uk/government/organisations/border-force");

  const hmps = n("HM Prison & Probation Service", "Executive Agency", 52000,
    "Carries out sentences given by the courts, rehabilitating offenders and reducing reoffending.",
    "https://www.gov.uk/government/organisations/her-majestys-prison-and-probation-service");

  const hmCourts = n("HM Courts & Tribunals Service", "Executive Agency", 16000,
    "Responsible for the administration of criminal, civil and family courts and tribunals in England and Wales.",
    "https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service");

  const companiesHouse = n("Companies House", "Executive Agency", 1100,
    "Incorporates and dissolves limited companies, registers company information and makes it available to the public.",
    "https://www.gov.uk/government/organisations/companies-house");

  const ipo = n("Intellectual Property Office", "Executive Agency", 1600,
    "The official UK government body responsible for intellectual property rights.",
    "https://www.gov.uk/government/organisations/intellectual-property-office");

  const mca = n("Maritime & Coastguard Agency", "Executive Agency", 1100,
    "A UK executive agency working to prevent the loss of lives at sea.",
    "https://www.gov.uk/government/organisations/maritime-and-coastguard-agency");

  const dvsa = n("Driver & Vehicle Standards Agency", "Executive Agency", 4700,
    "Carries out driving tests, approves people to be driving instructors and MOT testers.",
    "https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency");

  const voa = n("Valuation Office Agency", "Executive Agency", 3500,
    "Provides valuations and property advice to support taxation and benefits.",
    "https://www.gov.uk/government/organisations/valuation-office-agency");

  const rpa = n("Rural Payments Agency", "Executive Agency", 2500,
    "Delivers rural payments and rural inspections in support of Defra's policies.",
    "https://www.gov.uk/government/organisations/rural-payments-agency");

  const apha = n("Animal & Plant Health Agency", "Executive Agency", 2700,
    "Safeguards animal and plant health for the benefit of people, the environment and the economy.",
    "https://www.gov.uk/government/organisations/animal-and-plant-health-agency");

  const met = n("Met Office", "Executive Agency", 2100,
    "The UK's national weather service, providing weather and climate-related services.",
    "https://www.gov.uk/government/organisations/met-office");

  const dsa = n("Defence Science & Technology Laboratory", "Executive Agency", 4000,
    "Delivers high-impact science and technology for the UK's defence and security.",
    "https://www.gov.uk/government/organisations/defence-science-and-technology-laboratory");

  const deq = n("Defence Equipment & Support", "Executive Agency", 11000,
    "Equips and supports the UK's armed forces for operations now and in the future.",
    "https://www.gov.uk/government/organisations/defence-equipment-and-support");

  const dia = n("Defence Infrastructure Organisation", "Executive Agency", 4500,
    "Manages the Defence estate, enabling military capability through infrastructure.",
    "https://www.gov.uk/government/organisations/defence-infrastructure-organisation");

  const estyn = n("Estyn", "Executive Agency", 280,
    "Her Majesty's Inspectorate for Education and Training in Wales.");

  const sfa = n("Education & Skills Funding Agency", "Executive Agency", 1800,
    "Accountable for funding education and skills for children, young people and adults.",
    "https://www.gov.uk/government/organisations/education-and-skills-funding-agency");

  const sta = n("Standards & Testing Agency", "Executive Agency", 300,
    "Responsible for the development and delivery of statutory assessments in England.",
    "https://www.gov.uk/government/organisations/standards-and-testing-agency");

  const jfc = n("Jobcentre Plus", "Executive Agency", 30000,
    "Part of DWP, helps people find employment and provides financial support.",
    "https://www.gov.uk/contact-jobcentre-plus");

  const passportOffice = n("HM Passport Office", "Executive Agency", 4000,
    "Issues UK passports and provides civil registration services.",
    "https://www.gov.uk/government/organisations/hm-passport-office");

  const planningInspectorate = n("Planning Inspectorate", "Executive Agency", 1100,
    "Deals with planning appeals, national infrastructure planning applications and examinations of local plans.",
    "https://www.gov.uk/government/organisations/planning-inspectorate");

  const queensPrinter = n("Government Property Agency", "Executive Agency", 800,
    "Manages the government estate, providing workplaces for civil servants across the UK.",
    "https://www.gov.uk/government/organisations/government-property-agency");

  const ukvi = n("UK Visas & Immigration", "Executive Agency", 7000,
    "Responsible for making decisions about who has the right to visit or stay in the UK.",
    "https://www.gov.uk/government/organisations/uk-visas-and-immigration");

  const insolvencyService = n("Insolvency Service", "Executive Agency", 1600,
    "Provides public services to those affected by financial failure.",
    "https://www.gov.uk/government/organisations/insolvency-service");

  const nationalHighways = n("National Highways", "Executive Agency", 6500,
    "Government-owned company charged with operating, maintaining and improving the strategic road network in England.",
    "https://www.gov.uk/government/organisations/national-highways");

  const ukho = n("UK Hydrographic Office", "Executive Agency", 900,
    "Provides hydrographic and marine geospatial data for the Royal Navy and mariners worldwide.",
    "https://www.gov.uk/government/organisations/uk-hydrographic-office");

  // ========== PUBLIC BODIES (NDPBs etc.) ==========
  const nhsEngland = n("NHS England", "Public Body", 7500,
    "Leads the National Health Service in England, overseeing the budget, planning, and delivery of NHS services.",
    "https://www.england.nhs.uk/");

  const envAgency = n("Environment Agency", "Public Body", 10800,
    "Works to create better places for people and wildlife, and supports sustainable development.",
    "https://www.gov.uk/government/organisations/environment-agency");

  const naturalEngland = n("Natural England", "Public Body", 2300,
    "The government's adviser for the natural environment in England.",
    "https://www.gov.uk/government/organisations/natural-england");

  const hse = n("Health & Safety Executive", "Public Body", 2600,
    "The national regulator for workplace health and safety in Great Britain.",
    "https://www.gov.uk/government/organisations/health-and-safety-executive");

  const artsCouncil = n("Arts Council England", "Public Body", 600,
    "Development agency for creativity and culture, investing public money from government and the National Lottery.",
    "https://www.artscouncil.org.uk/");

  const sportEngland = n("Sport England", "Public Body", 350,
    "Invests in organisations and projects that get people playing sport and being physically active.",
    "https://www.sportengland.org/");

  const britishCouncil = n("British Council", "Public Body", 10000,
    "The UK's international organisation for cultural relations and educational opportunities.",
    "https://www.britishcouncil.org/");

  const heritageEngland = n("Historic England", "Public Body", 850,
    "Public body that champions and protects England's historic environment.",
    "https://historicengland.org.uk/");

  const networkRail = n("Network Rail", "Public Body", 42000,
    "Owns and manages most of the railway infrastructure in England, Scotland and Wales.",
    "https://www.networkrail.co.uk/");

  const ukri = n("UK Research & Innovation", "Public Body", 8000,
    "Works in partnership with universities, research organisations, businesses, charities and government.",
    "https://www.ukri.org/");

  const ofcom = n("Ofcom", "Public Body", 1000,
    "The UK's communications regulator, regulating TV, radio, telecoms, and postal services.",
    "https://www.ofcom.org.uk/");

  const homesEngland = n("Homes England", "Public Body", 1100,
    "The government's housing accelerator, focused on disrupting the housing market.",
    "https://www.gov.uk/government/organisations/homes-england");

  const defenceAcademy = n("UK Space Agency", "Public Body", 200,
    "An executive agency of the UK Government responsible for the UK's civil space programme.",
    "https://www.gov.uk/government/organisations/uk-space-agency");

  const cqc = n("Care Quality Commission", "Public Body", 3300,
    "The independent regulator of health and social care in England.",
    "https://www.cqc.org.uk/");

  const phe = n("UK Health Security Agency", "Public Body", 5500,
    "Responsible for planning, preventing and responding to external health threats.",
    "https://www.gov.uk/government/organisations/uk-health-security-agency");

  const ofr = n("Office for Students", "Public Body", 400,
    "The independent regulator for higher education in England.",
    "https://www.officeforstudents.org.uk/");

  const mhra = n("Medicines & Healthcare Products Regulatory Agency", "Public Body", 1300,
    "Regulates medicines, medical devices and blood components for transfusion in the UK.",
    "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency");

  const nio2 = n("National Infrastructure Commission", "Public Body", 60,
    "Provides impartial expert advice on major long term infrastructure challenges.",
    "https://nic.org.uk/");

  const nda = n("Nuclear Decommissioning Authority", "Public Body", 17000,
    "Responsible for the decommissioning and cleaning up of the UK's earliest nuclear sites.",
    "https://www.gov.uk/government/organisations/nuclear-decommissioning-authority");

  const bbcTrust = n("BBC", "Public Body", 22000,
    "The UK's national broadcaster, funded principally by the licence fee.",
    "https://www.bbc.co.uk/");

  const channelFour = n("Channel 4", "Public Body", 1100,
    "A publicly owned, commercially funded public service broadcaster.",
    "https://www.channel4.com/");

  const uksa = n("UK Statistics Authority", "Public Body", 300,
    "An independent body operating at arm's length from government, reporting to the UK Parliament.",
    "https://uksa.statisticsauthority.gov.uk/");

  const epa = n("Equality & Human Rights Commission", "Public Body", 250,
    "Britain's national equality body, established to encourage equality and diversity.",
    "https://www.equalityhumanrights.com/");

  const civilAviationAuth = n("Civil Aviation Authority", "Public Body", 1000,
    "The UK's specialist aviation regulator.",
    "https://www.caa.co.uk/");

  const britishLibrary = n("British Library", "Public Body", 1600,
    "The national library of the United Kingdom, one of the world's largest libraries.",
    "https://www.bl.uk/");

  const tfl = n("Transport for London", "Public Body", 27000,
    "The integrated transport authority responsible for meeting London's transport needs.",
    "https://tfl.gov.uk/");

  const hmicfrs = n("HM Inspectorate of Constabulary & Fire", "Public Body", 400,
    "Independently assesses the effectiveness and efficiency of police forces and fire services.",
    "https://www.justiceinspectorates.gov.uk/hmicfrs/");

  // ========== ASSEMBLE ==========
  const nodes = [
    // Ministerial Departments
    cabinetOffice, hmTreasury, homeOffice, mod, dfe, dhsc, fcdo, moj, defra,
    dft, dbt, dluhc, dwp, dcms, desnz, dsit, nio, scotlandOffice, walesOffice,
    ago, hmLandRegistry, co, lot, lol,
    // Non-Ministerial Departments
    hmrc, ofsted, cps, sfo, gld, nca, ofqual, ofgem, ofwat, ons, fca, cma,
    ico, charityCom, forestryComm, foodStandards, govActuaryDept, nsa,
    supremeCourt, ordnanceSurvey, waterServicesReg,
    // Executive Agencies
    dvla, borderForce, hmps, hmCourts, companiesHouse, ipo, mca, dvsa, voa,
    rpa, apha, met, dsa, deq, dia, estyn, sfa, sta, jfc, passportOffice,
    planningInspectorate, queensPrinter, ukvi, insolvencyService,
    nationalHighways, ukho,
    // Public Bodies
    nhsEngland, envAgency, naturalEngland, hse, artsCouncil, sportEngland,
    britishCouncil, heritageEngland, networkRail, ukri, ofcom, homesEngland,
    defenceAcademy, cqc, phe, ofr, mhra, nio2, nda, bbcTrust, channelFour,
    uksa, epa, civilAviationAuth, britishLibrary, tfl, hmicfrs,
  ];

  const links: LinkData[] = [
    // Cabinet Office links to top-level depts
    { source: cabinetOffice.id, target: hmTreasury.id },
    { source: cabinetOffice.id, target: gld.id },
    { source: cabinetOffice.id, target: queensPrinter.id },

    // HM Treasury
    { source: hmTreasury.id, target: hmrc.id },
    { source: hmTreasury.id, target: voa.id },
    { source: hmTreasury.id, target: nsa.id },
    { source: hmTreasury.id, target: govActuaryDept.id },
    { source: hmTreasury.id, target: co.id },

    // Home Office
    { source: homeOffice.id, target: borderForce.id },
    { source: homeOffice.id, target: ukvi.id },
    { source: homeOffice.id, target: passportOffice.id },
    { source: homeOffice.id, target: nca.id },

    // Ministry of Defence
    { source: mod.id, target: dsa.id },
    { source: mod.id, target: deq.id },
    { source: mod.id, target: dia.id },
    { source: mod.id, target: ukho.id },

    // Department for Education
    { source: dfe.id, target: ofsted.id },
    { source: dfe.id, target: ofqual.id },
    { source: dfe.id, target: sfa.id },
    { source: dfe.id, target: sta.id },
    { source: dfe.id, target: ofr.id },

    // Department of Health & Social Care
    { source: dhsc.id, target: nhsEngland.id },
    { source: dhsc.id, target: cqc.id },
    { source: dhsc.id, target: phe.id },
    { source: dhsc.id, target: mhra.id },

    // FCDO
    { source: fcdo.id, target: britishCouncil.id },

    // Ministry of Justice
    { source: moj.id, target: hmps.id },
    { source: moj.id, target: hmCourts.id },

    // Attorney General's Office
    { source: ago.id, target: cps.id },
    { source: ago.id, target: sfo.id },

    // Defra
    { source: defra.id, target: envAgency.id },
    { source: defra.id, target: naturalEngland.id },
    { source: defra.id, target: rpa.id },
    { source: defra.id, target: apha.id },
    { source: defra.id, target: forestryComm.id },
    { source: defra.id, target: met.id },
    { source: defra.id, target: foodStandards.id },

    // Department for Transport
    { source: dft.id, target: dvla.id },
    { source: dft.id, target: dvsa.id },
    { source: dft.id, target: mca.id },
    { source: dft.id, target: nationalHighways.id },
    { source: dft.id, target: networkRail.id },
    { source: dft.id, target: civilAviationAuth.id },

    // Department for Business & Trade
    { source: dbt.id, target: companiesHouse.id },
    { source: dbt.id, target: ipo.id },
    { source: dbt.id, target: insolvencyService.id },
    { source: dbt.id, target: cma.id },

    // Dept for Levelling Up, Housing & Communities
    { source: dluhc.id, target: homesEngland.id },
    { source: dluhc.id, target: planningInspectorate.id },

    // Department for Work & Pensions
    { source: dwp.id, target: jfc.id },
    { source: dwp.id, target: hse.id },

    // Dept for Culture, Media & Sport
    { source: dcms.id, target: artsCouncil.id },
    { source: dcms.id, target: sportEngland.id },
    { source: dcms.id, target: heritageEngland.id },
    { source: dcms.id, target: bbcTrust.id },
    { source: dcms.id, target: channelFour.id },
    { source: dcms.id, target: ofcom.id },
    { source: dcms.id, target: britishLibrary.id },

    // Dept for Energy Security & Net Zero
    { source: desnz.id, target: ofgem.id },
    { source: desnz.id, target: nda.id },

    // Dept for Science, Innovation & Technology
    { source: dsit.id, target: ukri.id },
    { source: dsit.id, target: defenceAcademy.id },

    // DLUHC -> HM Land Registry
    { source: dluhc.id, target: hmLandRegistry.id },

    // ONS under UK Stats Authority
    { source: uksa.id, target: ons.id },

    // Standalone links
    { source: homeOffice.id, target: hmicfrs.id },
    { source: dft.id, target: tfl.id },
    { source: hmTreasury.id, target: fca.id },
    { source: cabinetOffice.id, target: ico.id },
    { source: cabinetOffice.id, target: charityCom.id },
    { source: defra.id, target: ofwat.id },
    { source: dluhc.id, target: epa.id },
    { source: cabinetOffice.id, target: nio2.id },
    { source: dluhc.id, target: ordnanceSurvey.id },
  ];

  return { nodes, links };
}

// --- Store ---
interface GraphStore extends GraphData {
  selectedNode: NodeData | null;
  setSelectedNode: (node: NodeData | null) => void;

  addNode: (
    node: Omit<NodeData, "id" | "val"> & { staffCount: number }
  ) => void;
  updateNode: (
    id: string,
    data: Partial<Omit<NodeData, "id" | "val">> & { staffCount?: number }
  ) => void;
  removeNode: (id: string) => void;

  addLink: (source: string, target: string) => void;
  removeLink: (source: string, target: string) => void;
}

export const useGraphStore = create<GraphStore>((set) => {
  const seed = createSeedData();

  return {
    nodes: seed.nodes,
    links: seed.links,
    selectedNode: null,

    setSelectedNode: (node) => set({ selectedNode: node }),

    addNode: (data) => {
      const newNode: NodeData = {
        ...data,
        id: uuidv4(),
        val: staffToVal(data.staffCount),
      };
      set((s) => ({ nodes: [...s.nodes, newNode] }));
    },

    updateNode: (id, data) => {
      set((s) => ({
        nodes: s.nodes.map((n) => {
          if (n.id !== id) return n;
          const updated = { ...n, ...data };
          if (data.staffCount !== undefined) {
            updated.val = staffToVal(data.staffCount);
          }
          return updated;
        }),
      }));
    },

    removeNode: (id) => {
      set((s) => ({
        nodes: s.nodes.filter((n) => n.id !== id),
        links: s.links.filter((l) => l.source !== id && l.target !== id),
        selectedNode: s.selectedNode?.id === id ? null : s.selectedNode,
      }));
    },

    addLink: (source, target) => {
      set((s) => {
        const exists = s.links.some(
          (l) => l.source === source && l.target === target
        );
        if (exists) return s;
        return { links: [...s.links, { source, target }] };
      });
    },

    removeLink: (source, target) => {
      set((s) => ({
        links: s.links.filter(
          (l) => !(l.source === source && l.target === target)
        ),
      }));
    },
  };
});
