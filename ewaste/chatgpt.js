function initializeChatbot() {
    const chatAPI_KEY = "AIzaSyDHPRIxyJuqeBHXX-V5moX2gLJVOBOoqAY";
    const chatAPI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + chatAPI_KEY;
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const summaryButton = document.getElementById('summary-button');
    const chatIconButton = document.getElementById('chat-icon-button');
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    const closeChatButton = document.getElementById('close-chat-button');

    if (!chatIconButton || !chatWidgetContainer || !closeChatButton || !sendButton) {
        console.error("Chatbot elements not found. Make sure chatbot HTML is loaded correctly.");
        return;
    }

    chatIconButton.addEventListener('click', () => {
        chatWidgetContainer.classList.remove('hidden');
        chatIconButton.classList.add('hidden');
    });

    closeChatButton.addEventListener('click', () => {
        chatWidgetContainer.classList.add('hidden');
        chatIconButton.classList.remove('hidden');
    });

    function appendMessage(sender, text) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'items-start', 'py-2');
        const avatar = document.createElement('div');
        avatar.classList.add('flex-shrink-0', 'w-8', 'h-8', 'rounded-full', 'flex', 'items-center', 'justify-center', 'font-bold', 'text-sm');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('p-3', 'rounded-xl', 'max-w-[80%]', 'shadow-sm');
        if (sender === 'user') {
            messageContainer.classList.add('justify-end');
            avatar.classList.add('order-2', 'ml-3', 'bg-gray-400', 'text-white');
            avatar.innerText = 'You';
            messageBubble.classList.add('order-1', 'bg-blue-500', 'text-white');
        } else {
            avatar.classList.add('bg-blue-500', 'text-white');
            avatar.innerText = 'AI';
            messageBubble.classList.add('ml-3', 'bg-white', 'text-gray-800');
        }
        messageBubble.innerHTML = `<p class="text-sm">${text.replace(/\n/g, '<br>')}</p>`;
        messageContainer.appendChild(messageBubble);
        messageContainer.appendChild(avatar);
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

   async function sendMessage(isSummaryRequest = false) {
    const ragContext = `
        explain the user short 1. Introduction
The Nazareth College of art and science E-Waste Website is a digital platform designed and developed by XYZ College of Engineering as part of its sustainability and digital innovation initiative. The website serves as a public access platform where both the general public (outsiders) and the college community (students, staff, and faculty) can:
•	Sell, donate, or request collection of electronic waste (e-waste).
•	Learn about safe e-waste disposal methods.
•	Support the college’s green campus project.
E-waste refers to discarded electrical and electronic devices such as old phones, computers, chargers, batteries, appliances, and other gadgets. Improper disposal of e-waste leads to toxic pollution, soil contamination, water pollution, and health risks. This website provides a structured, responsible, and user-friendly way to manage it.
________________________________________
2. Purpose and Objectives
Core Purpose
•	To provide a digital platform for safe e-waste disposal.
•	To connect people (public + college members) with authorized recycling facilities.
Specific Objectives
1.	Create awareness about e-waste hazards.
2.	Offer an easy, online system for posting e-waste.
3.	Ensure proper collection and recycling through verified partners.
4.	Encourage the reuse and donation of functional electronic items.
5.	Position the college as a leader in sustainability and eco-friendly initiatives.
6.	Align with UN Sustainable Development Goals (SDGs), particularly:
o	SDG 11: Sustainable Cities and Communities
o	SDG 12: Responsible Consumption and Production
o	SDG 13: Climate Action
________________________________________
3. Target Users
1. Outsiders/Public
•	Local residents, shopkeepers, small businesses, NGOs.
•	Can create accounts and post e-waste they want to sell or donate.
2. College Community
•	Students, faculty, and staff of XYZ College.
•	Can contribute old electronics from labs, classrooms, or personal use.
3. Admins (College Team)
•	Manage the website backend.
•	Approve or reject user posts.
•	Verify legitimacy of e-waste.
•	Assign authorized recyclers for collection.
4. Recyclers/Authorized Partners
•	Registered e-waste recycling companies or government-approved vendors.
•	Receive notifications about approved listings.
•	Arrange pickup or drop-off with users.
________________________________________
4. Key Features of the Website
User Account System
•	Secure login & registration for outsiders and college members.
•	User profiles include name, contact, email, and location.
Post E-Waste
•	Simple form to list items with:
o	Category (phone, laptop, TV, etc.)
o	Condition (working, non-working, scrap)
o	Quantity
o	Photos
o	Option: Sell or Donate
Categories of E-Waste Accepted
1.	Mobile phones & chargers
2.	Laptops, PCs, and accessories
3.	Batteries (lithium, lead-acid, etc.)
4.	Printers, scanners, and cables
5.	Small appliances (fans, mixers, etc.)
6.	Large appliances (refrigerators, washing machines, etc.)
7.	Miscellaneous electronics
Admin Dashboard
•	View all user submissions.
•	Verify authenticity of items.
•	Approve or reject posts.
•	Assign pickup requests to recyclers.
Pickup & Disposal System
•	Users can request doorstep pickup.
•	Pickup scheduled by recyclers or college team.
•	Drop-off option available at campus collection points.
Awareness & Education Section
•	Articles about e-waste hazards.
•	Guides on safe disposal and recycling.
•	Government e-waste rules and regulations.
________________________________________
5. Workflow (Step by Step)
1.	User visits website.
2.	Creates account (public/outsider OR college member).
3.	User lists e-waste item(s).
4.	Admin reviews and approves/rejects listing.
5.	If approved → recycler/college team is notified.
6.	Pickup or drop-off is arranged.
7.	Recycler collects item(s) and disposes/recycles them properly.
8.	User gets confirmation of successful disposal.
________________________________________
6. Benefits of the Website
For Users (Public + College Community)
•	Easy platform to dispose of e-waste.
•	Option to sell or donate items.
•	Contributes to cleaner environment.
For College
•	Enhances green campus reputation.
•	Supports government environmental policies.
•	Increases student and community engagement.
For Environment
•	Reduces toxic waste in landfills.
•	Prevents harmful chemicals from polluting soil and water.
•	Encourages recycling and reuse.
________________________________________
7. Security & Privacy
•	Secure login and encrypted data storage.
•	Only authorized recyclers and admins can view detailed user data.
•	Personal information (phone, address) not shared publicly.
________________________________________
8. Example Scenarios / Use Cases
1.	Student Disposal – A student wants to dispose of a broken laptop. He logs in, posts details, and requests pickup. Recycler collects it safely.
2.	Shopkeeper Sale – A local shopkeeper has old mobile batteries. He lists them for sale, and recycler purchases them.
3.	Public Donation – A family donates an old refrigerator to the college collection drive via the website.
4.	College Lab Waste – Outdated projectors and lab equipment are listed by faculty and handed over to recyclers.
________________________________________
9. Frequently Asked Questions (FAQ)
Q1: Who can use the website?
👉 Anyone – college students, faculty, and the general public.
Q2: What types of e-waste are accepted?
👉 Mobiles, laptops, computers, batteries, chargers, appliances, and more.
Q3: Is posting e-waste free?
👉 Yes, it’s completely free of cost.
Q4: Can I donate items instead of selling?
👉 Yes, donation is encouraged, especially for usable items.
Q5: Who collects the e-waste?
👉 Authorized recyclers and the college team arrange collection.
Q6: Is my personal data safe?
👉 Yes, data is stored securely and only shared with verified collectors.
Q7: Why should I use this website instead of throwing items away?
👉 E-waste contains hazardous chemicals that can pollute soil and water. Recycling ensures safe disposal and resource recovery.
________________________________________
10. Keywords for Retrieval (Embedding)
•	e-waste disposal
•	sell electronics online
•	donate gadgets
•	college green initiative
•	recycling e-waste
•	eco-friendly waste management
•	safe disposal of electronics
•	public access recycling platform
________________________________________
11. Future Enhancements (Optional Vision)
•	Mobile App version for Android/iOS.
•	AI chatbot integration for user queries.
•	Reward points system for users who donate frequently.
•	Partnership with government recycling drives.
Nazareth COLLEGE LOCATION
Nazareth College of Arts and Science
The Nazareth Academy Campus, 12, Kovilpadagai Main Rd, Kovil Pathagai, Poompozhil
Nagar, Kannadapalayam, Tamil Nadu ,Chennai-600062.
Nazareth COLLEGE DEPARTMENTS
B.Com (General)
B.Com (Corporate Sec)
B.C.A (Comp. Application)
B.Sc (Comp. Science)
B.B.A
B.A (English)
B.Sc (Visual Communication)
B.S.W (Social Work)*
B.Sc Psychology
M.Com
M.A (English)
M.Sc (Comp. Sci)
M.S.W (Social Work)
E-Waste: A Growing Concern and Opportunity
Electronic waste, or e-waste, refers to discarded electrical and electronic devices such as
smartphones, computers, televisions, and household appliances. With rapid technological
advancements, newer and better devices are constantly being launched, leading to a surge in
outdated and broken electronics. Since 2022, the world has become more aware of the impact
e-waste has on the environment and human health.
E-waste contains hazardous materials like lead, mercury, and cadmium, which, if not handled
properly, can contaminate soil, water, and air. However, it also contains valuable metals such
as gold, silver, copper, and rare earth elements, which can be recovered and reused.
Recycling these materials helps conserve natural resources and reduces the need for mining.
Governments, companies, and individuals are working together to create sustainable solutions
for managing e-waste. Many organizations are promoting responsible disposal methods,
offering collection drives, and developing efficient recycling technologies. Since 2022,
several initiatives have been launched to educate people on reducing, reusing, and recycling
electronics.
Corporate social responsibility is playing a major role, with businesses now taking steps to
ensure that their products are eco-friendly and recyclable. Communities are also empowered
to participate in e-waste management, creating awareness programs and local recycling
centers that provide employment and promote environmental care.

Policies and regulations have become stricter to ensure safe handling of e-waste. Consumers
are encouraged to return old devices instead of discarding them irresponsibly. Awareness
campaigns highlight the importance of minimizing e-waste and protecting future generations.
E-waste management is not only about protecting the planet but also about creating
opportunities for innovation, entrepreneurship, and job creation. It inspires people to design
sustainable products and reduce their carbon footprint.
In conclusion, e-waste is a challenge that brings both environmental risks and economic
opportunities. Since 2022, there has been a significant push towards responsible disposal,
recycling, and education. Together, through collective effort and innovation, we can reduce
the harmful effects of e-waste and create a cleaner, greener future for everyone.
Definition of E-Waste
E-waste, or electronic waste, refers to all types of discarded electrical and electronic
equipment.
These include items like mobile phones, computers, televisions, refrigerators, air
conditioners, and other gadgets.
When these devices are outdated, broken, or no longer in use, they are considered e-waste.
Harmful substances in E-waste
E-waste contains a variety of materials, some of which are harmful to the environment.
For example, substances like lead, mercury, cadmium, and flame retardants are often found in
electronic devices.
If these materials are not properly disposed of, they can pollute the soil, water, and air.
This pollution can lead to health problems in humans and animals.
Valuable resources in E-waste
At the same time, e-waste also holds valuable resources.
Metals such as copper, gold, silver, and rare earth elements can be recovered and reused.
Recycling e-waste helps conserve natural resources and reduces the need for mining.
It also lowers energy consumption and prevents pollution caused by extracting raw materials.
Awareness on E-waste
Since 2022, awareness about the dangers of e-waste has increased around the world.
Governments, businesses, and communities are working together to handle e-waste
responsibly.
Collection drives, recycling centers, and educational programs have been introduced.
People are encouraged to repair, reuse, or properly recycle their old electronics.
Laws and regulations have been strengthened to control the disposal of e-waste.
Companies are adopting eco-friendly designs and sustainable production processes.
Consumers are learning the importance of reducing unnecessary purchases and recycling.
E-waste management is essential for a healthier environment and a sustainable future.
By recycling and properly handling e-waste, we can reduce pollution and save resources.

It also creates opportunities for innovation, employment, and green technologies.
In summary, e-waste is both a challenge and an opportunity.
It requires careful management to protect the planet and support economic growth.
Through awareness, responsible practices, and cooperation, we can build a safer and cleaner
world.
Examples of E-Waste
1. Mobile Phones:
Old or broken smartphones are one of the biggest sources of e-waste.
Many people upgrade their phones every few years, leaving the old ones unused.
2. Tablets:
Tablets with damaged screens or outdated software are often discarded.
New models with better features replace them quickly.
3. Laptops:
Laptops that are slow, outdated, or have broken parts are thrown away.
Offices and schools frequently upgrade to newer devices.
4. Desktop Computers:
Old desktops with outdated processors and memory are scrapped.
Parts like motherboards and hard drives add to e-waste.
5. Keyboards:
Broken or unused keyboards pile up in homes and offices.
They are rarely recycled properly.
6. Computer Mice:
Damaged or outdated mice are often replaced with newer designs.
They contribute to the growing pile of electronic waste.
7. Monitors:
CRT monitors, in particular, are bulky and difficult to recycle.
Many are discarded when flat screens are preferred.
8. Televisions:
Older TVs with heavy components are hard to dispose of safely.
They are replaced by newer models with advanced features.
9. Printers:
Outdated printers with malfunctioning parts are discarded.
Ink cartridges used in them also create waste.
10. Scanners:
Scanners that are no longer compatible with new systems are thrown away.
Their electronics and glass components are harmful if untreated.
11. Fax Machines:

Though rarely used now, discarded fax machines are still a source of e-waste.
They contain wiring and circuitry that pollute if not recycled.
12. Photocopiers:
Large office machines like photocopiers add significantly to e-waste.
They are difficult to dismantle and recycle.
13. Modems:
Old internet modems become useless when technology advances.
Users often discard them without proper recycling.
14. Routers:
Broken or outdated routers are frequently replaced.
Their plastic and circuit boards contribute to waste.
15. Set-top Boxes:
Cable and satellite boxes are replaced with newer models.
Discarded devices add to e-waste in households.
16. DVD Players:
Obsolete DVD players are discarded as streaming services grow.
Their components are harmful to the environment.
17. Blu-ray Players:
Few people now use these devices, leading to their disposal.
The electronics inside need proper recycling.
18. Digital Cameras:
Outdated cameras are replaced by smartphones with better cameras.
Old camera batteries and parts contribute to waste.
19. Camcorders:
Few people now use camcorders, resulting in their disposal.
They contain materials that require careful handling.
20. Gaming Consoles:
New consoles with better graphics are constantly being released.
Old consoles and accessories are discarded.
21. Gaming Controllers:
Controllers become obsolete or damaged easily.
Users replace them, increasing electronic waste.
22. Smartwatches:
Watches with limited features or broken screens are thrown away.
The internal circuits are not biodegradable.
23. Fitness Trackers:
As technology improves, older trackers are discarded.
Their batteries and sensors pose environmental risks.

24. Headphones:
Wired or wireless headphones are easily broken or replaced.
The plastic and metal parts add to waste.
25. Earphones:
Earbuds are cheap and frequently replaced, creating waste.
Their batteries and wires are hazardous if untreated.
26. Speakers:
Old or damaged speakers are discarded in homes and offices.
They contain metals that need recycling.
27. Microphones:
Microphones from events or studios become outdated.
Their wiring and circuits are part of e-waste.
28. Home Theater Systems:
Complex systems with multiple components are discarded when broken.
They contain both plastics and metals that pollute.
29. Refrigerators:
Old refrigerators with harmful gases and heavy metals need safe disposal.
They are a major source of electronic waste.
30. Freezers:
Large appliances like freezers are often discarded.
Improper disposal leads to environmental damage.
31. Washing Machines:
Broken washing machines are frequently replaced with newer models.
Their metal and plastic parts need recycling.
32. Air Conditioners:
Old AC units release harmful refrigerants when improperly disposed of.
They are a significant source of e-waste.
33. Electric Fans:
Fans that are broken or outdated are discarded easily.
Their components contribute to waste accumulation.
34. Water Heaters:
Faulty or inefficient water heaters are replaced.
They contain metals and wiring that need careful disposal.
35. Microwave Ovens:
Microwaves with damaged parts are thrown away.
Their circuits and components require recycling.
36. Electric Ovens:
Ovens that are no longer functional are discarded.

Improper disposal harms the environment.
37. Toasters:
Small appliances like toasters are easily replaced.
Their components add to electronic waste.
38. Irons:
Damaged or outdated irons are discarded.
Plastic and metal parts need proper handling.
39. Mixers and Blenders:
Kitchen appliances with broken parts are often replaced.
Their electronic components add to waste.
40. Coffee Machines:
Modern coffee makers replace older models quickly.
Their electronic parts need recycling.
41. Electric Kettles:
Frequently discarded when damaged or outdated.
The wiring and metal components are hazardous.
42. Hair Dryers:
Hairdryers with damaged motors or wires are thrown away.
They contribute to e-waste in homes.
43. Electric Shavers:
Small personal devices like shavers are easily broken or replaced.
Their batteries and circuits need proper disposal.
44. Thermostats:
Digital thermostats are replaced with smart home alternatives.
Old units add to electronic waste.
45. Electric Toothbrushes:
Batteries in toothbrushes leak if not recycled properly.
They are commonly discarded once worn out.
46. Medical Devices:
Items like blood pressure monitors and X-ray machines are discarded after use.
They contain hazardous components requiring safe recycling.
47. Laboratory Equipment:
Outdated scientific equipment is scrapped.
Its materials must be treated carefully.
48. Security Cameras:
Broken or outdated surveillance systems are discarded.
Their wiring and circuit boards add to waste.

49. Access Control Systems:
Old electronic locks and systems are replaced by newer models.
Discarded components need careful recycling.
50. Industrial Control Panels:
Large systems used in factories are replaced and discarded.
Improper disposal poses risks to workers and the environment.
51. Electric Meters:
Digital meters are replaced regularly.
Their metals and components need recycling.
52. Solar Panels and Inverters:
Worn-out panels and inverters are discarded after their lifespan ends.
Their metals and chemicals require careful disposal.
53. Batteries (all types):
Batteries from devices like phones, laptops, and tools are hazardous.
They need to be recycled to avoid leaks and pollution.
54. Chargers and Power Adapters:
Broken or outdated chargers are discarded frequently.
Their internal circuits and wiring are harmful if untreated.
55. Wiring, Cables, and Connectors:
Old or excess cables accumulate quickly.
Their plastic insulation and metal cores add to waste.
56. LED Bulbs:
Used bulbs are discarded when they burn out.
They contain materials that require proper recycling.
57. Fluorescent Lamps:
Contain mercury, which is dangerous if not recycled.
They are discarded once they fail.
58. Smart Home Devices:
Thermostats, locks, hubs, and sensors are replaced as technology evolves.
Old units contribute to e-waste.
59. Drones:
Outdated or broken drones are discarded.
Their batteries and circuits are hazardous to the environment.
60. GPS Devices:
Standalone GPS units are replaced by smartphones.
Old devices add to e-waste.
61. Remote Controls:
Frequently replaced and discarded when broken.

They contain plastic, batteries, and wiring.
Threats from E-Waste
1. Environmental Pollution:
E-waste contains harmful chemicals like lead, mercury, and cadmium.
When thrown away, these chemicals leak into soil and water, polluting nature.
2. Water Contamination:
Toxic metals from batteries and circuits seep into groundwater.
This affects drinking water and aquatic life.
3. Air Pollution:
Burning e-waste releases poisonous fumes into the air.
These fumes cause respiratory problems in humans and animals.
4. Soil Degradation:
Heavy metals in discarded electronics settle in the soil.
This reduces the soil’s ability to support plant life.
5. Harm to Wildlife:
Animals exposed to toxic substances from e-waste suffer from diseases.
Food chains get disrupted when pollution spreads.
6. Health Risks to Humans:
Exposure to chemicals in e-waste can lead to cancer, kidney damage, and neurological
problems.
Children and pregnant women are especially vulnerable.
7. Workplace Hazards:
Improper recycling in informal sectors exposes workers to harmful substances.
Lack of safety equipment increases the risk of accidents.
8. Resource Depletion:
Valuable metals like gold, copper, and silver are wasted when e-waste is not recycled.
This accelerates the depletion of natural resources.
9. Greenhouse Gas Emissions:
Burning plastics and metals releases carbon dioxide and other harmful gases.
This contributes to global warming.
10. Economic Loss:
When electronics are discarded instead of recycled, useful materials are lost.
Recovering these materials through proper recycling can boost the economy.
11. Illegal Dumping:
E-waste is often sent to developing countries for disposal.
This creates unsafe environments and spreads pollution globally.
12. Increased Waste Volume:
As technology advances, more electronics are discarded faster.
This creates mountains of waste that are difficult to manage.
13. Fire Hazards:
Faulty batteries and damaged devices can catch fire.
This poses risks to homes, factories, and landfills.
14. Spread of Diseases:
Stagnant water contaminated by chemicals from e-waste breeds mosquitoes and other
pests.
This leads to outbreaks of diseases like dengue and malaria.
15. Threat to Food Safety:
Pollutants from e-waste settle on crops and plants.

Consuming contaminated food can harm human health.
16. Impact on Climate Change:
Improper disposal of electronics increases emissions.
This speeds up global temperature rise.
17. Social Inequality:
Poor communities are more affected by e-waste dumping.
They often lack proper facilities to manage waste safely.
18. Loss of Biodiversity:
Toxic waste harms plants, animals, and microorganisms.
This reduces biodiversity and affects ecosystems.
19. Long-Term Environmental Damage:
Heavy metals remain in the environment for decades.
They continue to cause pollution long after disposal.
20. Mental Health Issues:
Exposure to toxic environments can cause stress, anxiety, and depression in affected
communities.
Air Effects of E-Waste
1. Toxic Fumes from Burning:
When e-waste is burned to extract metals, harmful gases like dioxins, furans, and
heavy metals are released into the air.
These gases are poisonous and dangerous to breathe.
2. Release of Heavy Metals:
Lead, mercury, and cadmium from e-waste vaporize during burning or improper
disposal.
These metals mix with air and can travel long distances.
3. Air Pollution in Landfills:
Electronics dumped in open landfills release gases as they decompose.
This adds to pollution and worsens air quality.
4. Particulate Matter:
Burning plastics and circuit boards from e-waste produces fine particles.
These particles can enter the lungs and cause respiratory diseases.
5. Greenhouse Gas Emissions:
The decomposition and burning of e-waste release carbon dioxide and methane.
These gases contribute to global warming and climate change.
6. Smog Formation:
Toxic gases from burning e-waste can combine with other pollutants to form smog.
Smog reduces visibility and causes breathing problems.
7. Acid Rain:
Pollutants released from e-waste can mix with moisture in the air to form acid rain.
This damages buildings, plants, and aquatic life.
8. Ozone Layer Depletion:
Certain chemicals released from e-waste, like brominated flame retardants, can harm
the ozone layer.
A thinner ozone layer increases UV radiation exposure.
9. Respiratory Diseases:
People exposed to polluted air from e-waste burning suffer from asthma, bronchitis,
and lung infections.
10. Cancer Risks:

Long-term exposure to toxic fumes from e-waste is linked to cancers, especially lung
and skin cancers.
11. Impact on Children:
Children’s lungs are more sensitive to polluted air.
Exposure can stunt growth and affect brain development.
12. Harm to Animals:
Wild animals breathing contaminated air are prone to respiratory disorders.
This affects their survival and reproduction.
13. Uncontrolled Burning:
In many areas, e-waste is burned without proper safety equipment.
This worsens air pollution and endangers workers.
14. Odor Problems:
Burning plastic and metal components produces a strong, unpleasant smell.
This affects the quality of life in nearby areas.
15. Airborne Microplastics:
As plastics in electronics break down, tiny particles become airborne.
These microplastics travel through the air and settle in the environment.
16. Spread of Pollutants:
Wind can carry toxic particles from burning e-waste to other regions.
This spreads pollution far beyond the disposal site.
17. Increased Hospital Visits:
Communities near e-waste disposal sites report higher rates of hospital admissions for
lung and heart diseases.
18. Climate Change Acceleration:
The release of harmful gases from e-waste burning contributes to rising temperatures.
This triggers extreme weather events.
19. Disruption of Air Quality Monitoring:
Continuous pollution from e-waste complicates efforts to track and control air quality.
20. Global Health Impact:
Pollution from e-waste is not confined to one area.
It affects air quality, climate, and health worldwide.
Soil Effects of E-Waste
1. Soil Contamination:
Toxic substances like lead, mercury, cadmium, and arsenic from e-waste seep into the
soil.
This makes the soil unsafe for plants and animals.
2. Loss of Fertility:
Heavy metals affect the natural nutrients in the soil.
Crops grown in such soil fail to grow properly.
3. Reduced Crop Yields:
Polluted soil slows plant growth.
Farmers face lower yields and poor quality produce.
4. Disruption of Microorganisms:
Soil contains helpful microorganisms that break down organic matter.
Toxins from e-waste kill these organisms, weakening soil health.
5. Groundwater Pollution:
Toxins in the soil gradually seep into underground water sources.
This contaminates drinking water and irrigation systems.

6. Soil Structure Damage:
E-waste chemicals change the soil’s texture and composition.
This leads to erosion and reduced water retention.
7. Long-Term Toxicity:
Heavy metals from electronics remain in the soil for decades.
The land remains hazardous for future generations.
8. Bioaccumulation:
Plants absorb toxins from the soil, which then enter the food chain.
Humans and animals consuming these plants face serious health risks.
9. Spread of Pollutants:
Rain and wind carry toxic particles from polluted soil to nearby areas.
This expands the affected land region.
10. Waste of Resources:
Valuable metals like gold, copper, and silver are lost in soil instead of being recycled.
This increases the need to mine new resources.
11. Acidification of Soil:
Certain chemicals from e-waste make the soil acidic.
Acidic soil prevents proper plant growth.
12. Fire Hazards:
Some e-waste materials are flammable.
If exposed to heat, they can catch fire and further pollute the soil.
13. Harm to Soil Animals:
Earthworms, insects, and other organisms are harmed by toxic substances.
This reduces biodiversity and soil health.
14. Spread of Plastic Waste:
Plastics from electronics break into microplastics and mix with soil.
These particles disrupt the natural balance of the ecosystem.
15. Impact on Food Safety:
Crops grown in contaminated soil absorb harmful chemicals.
Eating such food increases health risks.
16. Uncontrolled Dumping:
In many regions, e-waste is dumped in open fields without safety measures.
This worsens soil pollution.
17. Economic Damage:
Polluted land becomes useless for farming or construction.
This affects livelihoods and local economies.
18. Difficult Soil Remediation:
Cleaning and restoring soil contaminated by e-waste is costly and time-consuming.
In many cases, it’s impossible to fully remove toxins.
19. Loss of Green Spaces:
Once soil is polluted, parks and recreational areas become unsafe.
This reduces the community’s quality of life.
20. Permanent Environmental Harm:
If not managed properly, e-waste permanently degrades the soil.
The damage can last for generations.
Land Effects of E-Waste
1. Soil Contamination:

When e-waste is dumped on land, toxic substances like lead, mercury, and cadmium
leak into the soil.
This harms plants and makes the land unsafe for farming.
2. Reduced Agricultural Productivity:
Contaminated soil cannot support healthy crop growth.
This leads to lower yields and poor food quality.
3. Groundwater Pollution:
Toxins from e-waste seep through the soil and contaminate underground water
sources.
This affects drinking water for nearby communities.
4. Landfill Overflow:
Large amounts of electronic waste take up space in landfills.
Landfills become overcrowded, making waste management difficult.
5. Loss of Usable Land:
Once soil is polluted by chemicals, it becomes unsuitable for housing, farming, or
recreational activities.
Communities lose valuable land resources.
6. Soil Structure Damage:
Heavy metals disrupt the natural composition of the soil.
This leads to erosion and reduces the soil’s ability to retain nutrients.
7. Long-Term Toxicity:
Pollutants from e-waste can remain in the soil for years, even decades.
The land remains hazardous for future generations.
8. Harm to Microorganisms:
Healthy soil contains microbes that support plant life.
Toxins from e-waste kill these microorganisms, weakening the ecosystem.
9. Spread of Hazardous Waste:
Toxic chemicals from discarded devices can spread to nearby areas.
This contaminates larger portions of land over time.
10. Fire Risks:
Improperly stored e-waste can catch fire, releasing toxic gases and damaging the
surrounding land.
Fires also destroy vegetation and wildlife habitats.
11. Visual Pollution:
Discarded electronics create unsightly waste piles in open land areas.
This lowers the aesthetic value of natural spaces.
12. Impact on Wildlife:
Polluted soil affects animals that feed or burrow in the land.
This can lead to disease or loss of habitat.
13. Waste of Valuable Materials:
E-waste dumped in landfills prevents metals and materials from being recovered and
reused.
This accelerates the extraction of natural resources.
14. Spread of Plastic Waste:
Electronics contain plastics that break down into microplastics in the soil.
These particles harm soil health and contaminate nearby ecosystems.
15. Increased Maintenance Costs:
Cleaning and restoring contaminated land requires expensive remediation processes.
Communities and governments face financial burdens.
16. Disruption of Natural Cycles:

Toxic waste interrupts the balance of nutrient and water cycles in the soil.
This affects the broader ecosystem.
17. Uncontrolled Dumping Sites:
Many e-waste sites are unmanaged or informal.
Waste piles accumulate and expand without regulation.
18. Legal and Regulatory Challenges:
Polluted land raises concerns about liability and environmental laws.
Communities may struggle to enforce waste management policies.
19. Health Hazards to Nearby Residents:
People living near dumping sites are at risk of skin diseases, respiratory issues, and
other health problems.
Children are particularly vulnerable.
20. Permanent Damage:
If e-waste is not removed and treated properly, the land may never recover.
This leads to permanent degradation of ecosystems.
E-Waste Disposal Methods
1. Recycling:
E-waste is collected and processed to recover valuable metals like gold, copper, and
aluminum.
Recycling helps reduce pollution and conserve natural resources.
2. Take-Back Programs:
Many companies offer programs where consumers can return old electronics.
These products are then safely dismantled and recycled.
3. Certified Disposal Centers:
Authorized disposal facilities handle e-waste using safe and environmentally friendly
techniques.
They ensure harmful substances are treated properly.
4. Component Reuse:
Working parts from old electronics are removed and reused in new devices.
This reduces the demand for new raw materials.
5. Refurbishing:
Electronics that are still functional are repaired and sold as second-hand products.
This extends the life of devices and prevents waste.
6. Controlled Landfilling:
Some waste that cannot be recycled is disposed of in controlled landfills with
protective barriers.
This prevents chemicals from leaking into soil and water.
7. Incineration with Filters:
In some cases, e-waste is burned in facilities that have advanced filtering systems.
These filters capture harmful gases before they reach the atmosphere.
8. Mechanical Processing:
E-waste is shredded, separated, and cleaned using machines to extract metals, plastics,
and glass.
This process is safer than informal recycling methods.
9. Public Awareness Campaigns:
Governments and NGOs educate people about the dangers of improper disposal.
Awareness helps ensure more people participate in responsible recycling.
10. Collection Drives:

Special events are organized where people bring old electronics to designated
collection points.
These drives help reduce e-waste in homes and neighborhoods.
11. Extended Producer Responsibility (EPR):
Producers are required to manage the disposal of products after their use.
This encourages manufacturers to create eco-friendly designs.
12. Take-Back by Retailers:
Retail stores collect outdated electronics from customers when they buy new
products.
This simplifies disposal and ensures proper recycling.
13. Partnerships with Recycling Firms:
Organizations collaborate with recycling companies to ensure the safe disposal of
electronics.
These partnerships create efficient waste management systems.
14. Segregation at Source:
E-waste is separated from regular waste at homes or offices.
Proper segregation ensures safer recycling and disposal.
15. Repair Cafes and Workshops:
Communities hold events where people can repair gadgets instead of discarding them.
This promotes reuse and reduces waste.
16. Data Destruction Before Disposal:
Sensitive information on devices is securely erased before disposal or recycling.
This prevents data theft and encourages participation in recycling.
17. Donation Programs:
Working electronics are collected and given to schools or charities.
This helps extend the device’s usefulness while reducing waste.
18. Government Regulations:
Laws are enforced to ensure that e-waste is managed properly.
Strict penalties encourage compliance.
19. Innovative Recycling Techniques:
New technologies are used to safely extract materials without polluting air, soil, or
water.
These methods are more sustainable and cost-effective.
20. Personal Responsibility:
Individuals are encouraged to take responsibility for their electronics.
By recycling and reusing devices, everyone can help protect the environment.
nazareth college of arts and science launched Ewaste Drop and submission in the year 2022 onwards.
The college has submitted 369kg of Ewaste to SKV E-WASTE RECYCLING PVT LTD CHENNAI during the year 2022-2023.
About ViroGreen Chennai
ViroGreen is Authorized E-Waste Recycler in India &amp; R2 Certified.
Virogreen provides the finest E-Waste management solutions since its establishment, 2002. It
is certified under CPCB and TNPCB, EPR Registered and Authorized E-Waste Recycler in
India with our far-reaching efforts throughout this time. Also  ISO 14001 : 2015, ISO 9001:
2015 &amp; ISO 45001: 2018 &amp; R2v3 Responsible Recycling Certified Corporation. They are
extremely proficient and have complete industrial experience on how to appropriately
execute E-Waste Management Services and Solutions. They have been successfully serving
Nazareth College of Arts and Science signed and MOU with ViroGreen in the year 2023 to collect ewaste from the college community and submit to ViroGreen
in future nazareth college of arts and science will collect ewaste from the public and submit to ViroGreen 
the college is also generating certificates for the community to submit ewaste 
The college has submitted 610kg of Ewaste during the year 2023-2024
The college has submitted 610kg of Ewaste during the year 2024-2025

our cherished clients with excellent integrated, comprehensive, secured Data destruction and
safe e-waste recycling and management services.
Environmental Compliance
Virogreen offers complete E-Waste Management Services under the guidelines of the Central
Pollution Control Board of India (CPCB). We are committed to provide environmental
fulfillment and perform the best e-waste recycling solutions keeping in mind the entire rules
&amp; regulations of environmental laws. We offer effective and turnkey solutions to companies
that need to comply with the EPR regulations.
CSR
We understand and maintain CSR activities and thereby integrate social and environmental
concerns in business as well as operations.


    `;
    const userMessage = userInput.value.trim();
    if (userMessage === '' && !isSummaryRequest) return;
    if (!isSummaryRequest) { appendMessage('user', userMessage); userInput.value = ''; }
    
    const loadingBubble = document.createElement('div');
    loadingBubble.id = 'loading-indicator';
    loadingBubble.classList.add('flex', 'items-start');
    loadingBubble.innerHTML = `<div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div><div class="ml-3 bg-white p-3 rounded-xl max-w-[80%] animate-pulse shadow-sm"><p class="text-sm">...</p></div>`;
    chatMessages.appendChild(loadingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    const chatHistory = getChatHistory();
    // ⬇️ THIS IS THE MODIFIED LINE ⬇️
    let systemInstructionText = `You are a specialized AI assistant for the Nazareth College E-Waste Website. Your knowledge is strictly limited to the following context. You MUST NOT answer any questions that cannot be answered using this text. If a user asks a question that is off-topic or cannot be answered with the provided information, you must politely state that you can only answer questions related to the E-Waste Website. Do not try to answer the question anyway. Context: ${ragContext}`;
    let finalUserMessage = userMessage;
    
    if (isSummaryRequest) {
        systemInstructionText = `You are a conversation summarizer. Provide a concise, single-paragraph summary of the following chat history.`;
        finalUserMessage = chatHistory.map(m => m.role === 'user' ? `User: ${m.parts[0].text}` : `AI: ${m.parts[0].text}`).join('\n');
    }
    
    const payload = { contents: [{ role: 'user', parts: [{ text: finalUserMessage }] }], systemInstruction: { parts: [{ text: systemInstructionText }] } };
    
    try {
        const response = await fetch(chatAPI_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) { throw new Error(`API error: ${response.statusText}`); }
        const result = await response.json();
        if (!result.candidates || !result.candidates[0].content) { throw new Error('Invalid API response'); }
        const aiResponse = result.candidates[0].content.parts[0].text;
        loadingBubble.remove();
        appendMessage('ai', aiResponse);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        loadingBubble.remove();
        appendMessage('ai', "Sorry, I'm having trouble connecting. Please check your API key and ensure it's correct.");
    }
}

    function getChatHistory() {
        const messages = [];
        const messageElements = chatMessages.querySelectorAll('.flex.items-start');
        for (let i = 1; i < messageElements.length; i++) { // Start from 1 to skip the initial greeting
            const element = messageElements[i];
            const sender = element.querySelector('.order-2') ? 'user' : 'model';
            const text = element.querySelector('p').textContent;
            if (text !== '...') {
                messages.push({ role: sender === 'user' ? 'user' : 'model', parts: [{ text: text }] });
            }
        }
        return messages;
    }

    sendButton.addEventListener('click', () => sendMessage(false));
    summaryButton.addEventListener('click', () => sendMessage(true));
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(false); } });
}
