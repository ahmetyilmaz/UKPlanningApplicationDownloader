# 🏗️ UK Planning Application Downloader

A clean, fast, and modern web extension allowing you to bulk-download all files and documents from UK local council planning applications with a single click. No more downloading hundreds of PDF files manually!

## ✨ Features

- **One-click bulk downloads**: Instantly grab every asset attached to a planning application.
- **Intelligent Organization**: Automatically organizes downloads into subfolders named `[Reference] [Address]` (Chrome and Edge).
- **Universal Compatibility**: Works in all major browsers (Safari, Chrome, Edge, Firefox).
- **Sanitized Naming**: Downloads the application summary as a clean `[Reference] [Address].json` file.
- **Manifest V3 compliant**: Modern, secure, and performant.
- **Zero dependencies**: Built with pure, 100% Vanilla JavaScript.
- **Auto-navigation**: For Idox portals, the download button automatically navigates to the documents tab if not already there.
- **Toast Notifications**: Shows progress and status messages during download.

## 🌍 Supported Planning Portals

Our extension supports the planning portals of the following UK councils and authorities:

### Idox-based Portals

| Council Name | Domain |
|--------------|--------|
| Aberdeen City | aberdeencity.gov.uk |
| Aberdeenshire | aberdeenshire.gov.uk |
| Adur | adur.gov.uk |
| Allerdale Borough | allerdale.gov.uk |
| Amber Valley Borough | ambervalley.gov.uk |
| Angus | angus.gov.uk |
| Antrim and Newtownabbey District | antrimandnewtownabbey.gov.uk |
| Ards and North Down District | ardsandnorthdown.gov.uk |
| Argyll & Bute | argyll-bute.gov.uk |
| Armagh Banbridge and Craigavon | armaghbanbridgecraigavon.gov.uk |
| Arun District | arun.gov.uk |
| Ashfield District | ashfield.gov.uk |
| Ashford Borough | ashford.gov.uk |
| Aylesbury Vale District | aylesburyvaledc.gov.uk |
| Babergh District | babergh.gov.uk |
| Barking and Dagenham | lbbd.gov.uk |
| Barnet | barnet.gov.uk |
| Barnsley Borough | barnsley.gov.uk |
| Barrow-in-Furness Borough | barrowbc.gov.uk |
| Basildon District | basildon.gov.uk |
| Basingstoke and Deane Borough | basingstoke.gov.uk |
| Bassetlaw District | bassetlaw.gov.uk |
| Bath and North East Somerset | bathnes.gov.uk |
| Bedford Borough | bedford.gov.uk |
| Belfast City | airqualityni.co.uk |
| Bexley | bexley.gov.uk |
| Birmingham City | birmingham.gov.uk |
| Blaby District | blaby.gov.uk |
| Blackburn with Darwen | blackburn.gov.uk |
| Blackpool | blackpool.gov.uk |
| Blaenau Gwent County Borough | blaenau-gwent.gov.uk |
| Bolsover District | bolsover.gov.uk |
| Bolton Borough | bolton.gov.uk |
| Boston Borough | boston.gov.uk |
| Bournemouth, Christchurch and Poole | bcpcouncil.gov.uk |
| Bracknell Forest Borough | bracknell-forest.gov.uk |
| Braintree District | braintree.gov.uk |
| Breckland District | breckland.gov.uk |
| Brent | brent.gov.uk |
| Brentwood Borough | brentwood.gov.uk |
| Bridgend County Borough | srs.wales |
| Brighton and Hove | brighton-hove.gov.uk |
| Bristol City | bristol.gov.uk |
| Broadland District | broadland.gov.uk |
| Bromley | bromley.gov.uk |
| Bromsgrove District | bromsgrove.gov.uk |
| Broxbourne Borough | broxbourne.gov.uk |
| Broxtowe Borough | broxtowe.gov.uk |
| Buckinghamshire | buckinghamshire.gov.uk |
| Burnley Borough | burnley.gov.uk |
| Bury Borough | bury.gov.uk |
| Caerphilly County Borough | caerphilly.gov.uk |
| Calderdale Borough | calderdale.gov.uk |
| Cambridge City | cambridge.gov.uk |
| Camden | camden.gov.uk |
| Cannock Chase District | cannockchasedc.gov.uk |
| Canterbury City | canterbury.gov.uk |
| Cardiff County | srs.wales |
| Carlisle City | carlisle.gov.uk |
| Carmarthenshire County | carmarthenshire.gov.wales |
| Castle Point District | castlepoint.gov.uk |
| Causeway Coast and Glens | causewaycoastandglens.gov.uk |
| Central Bedfordshire | centralbedfordshire.gov.uk |
| Ceredigion County | ceredigion.gov.uk |
| Charnwood Borough | charnwood.gov.uk |
| Chelmsford City | chelmsford.gov.uk |
| Cheltenham Borough | cheltenham.gov.uk |
| Cherwell District | cherwell.gov.uk |
| Cheshire East | cheshireeast.gov.uk |
| Cheshire West and Chester | cheshirewestandchester.gov.uk |
| Chesterfield Borough | chesterfield.gov.uk |
| Chichester District | chichester.gov.uk |
| Chiltern District | chiltern.gov.uk |
| Chorley Borough | chorley.gov.uk |
| City of Bradford | bradford.gov.uk |
| City of London | cityoflondon.gov.uk |
| City of York | york.gov.uk |
| Clackmannanshire | clacks.gov.uk |
| Colchester City | colchester.gov.uk |
| Comhairle nan Eilean Siar | cne-siar.gov.uk |
| Conwy County Borough | conwy.gov.uk |
| Copeland Borough | copeland.gov.uk |
| Corby Borough | corby.gov.uk |
| Cornwall | cornwall.gov.uk |
| Coventry City | coventry.gov.uk |
| Craven District | cravendc.gov.uk |
| Crawley Borough | crawley.gov.uk |
| Croydon | croydon.gov.uk |
| Cumberland | cumberland.gov.uk |
| Dacorum Borough | dacorum.gov.uk |
| Darlington Borough | darlington.gov.uk |
| Dartford Borough | dartford.gov.uk |
| Daventry District | daventrydc.gov.uk |
| Denbighshire County | denbighshire.gov.uk |
| Derby City | derby.gov.uk |
| Derbyshire Dales District | derbyshiredales.gov.uk |
| Derry City and Strabane | derrystrabane.com |
| Doncaster Borough | doncaster.gov.uk |
| Dorset Council | dorsetcouncil.gov.uk |
| Dover District | dover.gov.uk |
| Dudley Borough | dudley.gov.uk |
| Dumfries and Galloway | dumfriesandgalloway.gov.uk |
| Dundee City | dundeecity.gov.uk |
| Durham | durham.gov.uk |
| Ealing | ealing.gov.uk |
| East Ayrshire | east-ayrshire.gov.uk |
| East Cambridgeshire District | eastcambs.gov.uk |
| East Devon District | eastdevon.gov.uk |
| East Dorset District | dorsetforyou.com |
| East Dunbartonshire | scottishairquality.scot |
| East Hampshire District | easthants.gov.uk |
| East Hertfordshire District | eastherts.gov.uk |
| East Lindsey District | e-lindsey.gov.uk |
| East Lothian | eastlothian.gov.uk |
| East Northamptonshire | east-northamptonshire.gov.uk |
| East Renfrewshire | scottishairquality.scot |
| East Riding of Yorkshire | eastriding.gov.uk |
| East Staffordshire Borough | eaststaffsbc.gov.uk |
| East Suffolk | eastsuffolk.gov.uk |
| Eastbourne Borough | eastbourne.gov.uk |
| Eastleigh Borough | eastleigh.gov.uk |
| Eden District | eden.gov.uk |
| Edinburgh City | edinburgh.gov.uk |
| Elmbridge Borough | elmbridge.gov.uk |
| Enfield | enfield.gov.uk |
| Epping Forest District | eppingforestdc.gov.uk |
| Epsom & Ewell Borough | epsom-ewell.gov.uk |
| Erewash Borough | erewash.gov.uk |
| Exeter City | exeter.gov.uk |
| Falkirk | falkirk.gov.uk |
| Fareham Borough | fareham.gov.uk |
| Fenland District | fenland.gov.uk |
| Fermanagh and Omagh District | fermanaghomagh.com |
| Fife | fife.gov.uk |
| Flintshire County | flintshire.gov.uk |
| Folkestone and Hythe District | folkestone-hythe.gov.uk |
| Forest of Dean District | fdean.gov.uk |
| Fylde Borough | fylde.gov.uk |
| Gateshead Borough | gateshead.gov.uk |
| Gedling Borough | gedling.gov.uk |
| Glasgow City | glasgow.gov.uk |
| Gloucester City | gloucester.gov.uk |
| Gosport Borough | gosport.gov.uk |
| Gravesham Borough | gravesham.gov.uk |
| Great Yarmouth Borough | great-yarmouth.gov.uk |
| Greenwich | royalgreenwich.gov.uk |
| Guildford Borough | guildford.gov.uk |
| Gwynedd | gwynedd.gov.uk |
| Halton Borough | halton.gov.uk |
| Hambleton District | hambleton.gov.uk |
| Hammersmith and Fulham | lbhf.gov.uk |
| Harborough District | harborough.gov.uk |
| Haringey | haringey.gov.uk |
| Harlow District | harlow.gov.uk |
| Harrow | harrow.gov.uk |
| Harrogate Borough | harrogate.gov.uk |
| Hart District | hart.gov.uk |
| Hartlepool Borough | hartlepool.gov.uk |
| Hastings Borough | hastings.gov.uk |
| Havering | havering.gov.uk |
| Havant Borough | havant.gov.uk |
| Herefordshire | herefordshire.gov.uk |
| Hertsmere Borough | hertsmere.gov.uk |
| High Peak Borough | highpeak.gov.uk |
| Highland | highland.gov.uk |
| Hillingdon | hillingdon.gov.uk |
| Hinckley and Bosworth Borough | hinckley-bosworth.gov.uk |
| Horsham District | horsham.gov.uk |
| Hounslow | hounslow.gov.uk |
| Huntingdonshire District | huntingdonshire.gov.uk |
| Hyndburn Borough | hyndburnbc.gov.uk |
| Inverclyde | inverclyde.gov.uk |
| Ipswich Borough | ipswich.gov.uk |
| Isle of Anglesey County | anglesey.gov.wales |
| Isle of Wight | iow.gov.uk |
| Islington | islington.gov.uk |
| Kensington and Chelsea | rbkc.gov.uk |
| Kent County | kent.gov.uk |
| Kettering Borough | kettering.gov.uk |
| King's Lynn and West Norfolk Borough | west-norfolk.gov.uk |
| Kingston upon Hull City | hull.gov.uk |
| Kingston upon Thames | kingston.gov.uk |
| Kirklees Borough | kirklees.gov.uk |
| Knowsley Borough | knowsley.gov.uk |
| Lambeth | lambeth.gov.uk |
| Lancaster City | lancaster.gov.uk |
| Leeds City | leeds.gov.uk |
| Leicester City | leicester.gov.uk |
| Lewes District | lewes-eastbourne.gov.uk |
| Lewisham | lewisham.gov.uk |
| Lichfield City | lichfielddc.gov.uk |
| Lincoln City | lincoln.gov.uk |
| Lisburn City and Castlereagh | lisburncastlereagh.gov.uk |
| Liverpool City | liverpool.gov.uk |
| Luton Borough | luton.gov.uk |
| Maidstone Borough | maidstone.gov.uk |
| Maldon District | maldon.gov.uk |
| Malvern Hills District | malvernhills.gov.uk |
| Manchester City | manchester.gov.uk |
| Mansfield District | mansfield.gov.uk |
| Medway | medway.gov.uk |
| Melton Borough | melton.gov.uk |
| Mendip District | mendip.gov.uk |
| Merthyr Tydfil County Borough | merthyr.gov.uk |
| Merton | merton.gov.uk |
| Mid and East Antrim District | airqualityni.co.uk |
| Mid Devon District | middevon.gov.uk |
| Mid Suffolk District | midsuffolk.gov.uk |
| Mid Sussex District | midsussex.gov.uk |
| Mid Ulster District | airqualityni.co.uk |
| Middlesbrough Borough | middlesbrough.gov.uk |
| Midlothian | midlothian.gov.uk |
| Milton Keynes | milton-keynes.gov.uk |
| Mole Valley District | molevalley.gov.uk |
| Monmouthshire | monmouthshire.gov.uk |
| Moray | moray.gov.uk |
| Neath Port Talbot County Borough | npt.gov.uk |
| New Forest District | newforest.gov.uk |
| Newark and Sherwood District | newark-sherwooddc.gov.uk |
| Newcastle City | newcastle.gov.uk |
| Newcastle-under-Lyme Borough | newcastle-staffs.gov.uk |
| Newham | newham.gov.uk |
| Newport City | newport.gov.uk |
| Newry Mourne and Down District | airqualityni.co.uk |
| North Ayrshire | scottishairquality.scot |
| North Devon District | northdevon.gov.uk |
| North East Derbyshire District | ne-derbyshire.gov.uk |
| North East Lincolnshire | nelincs.gov.uk |
| North Hertfordshire District | north-herts.gov.uk |
| North Kesteven District | n-kesteven.gov.uk |
| North Lanarkshire | northlanarkshire.gov.uk |
| North Lincolnshire | northlincs.gov.uk |
| North Norfolk District | north-norfolk.gov.uk |
| North Northamptonshire | northnorthants.gov.uk |
| North Somerset | n-somerset.gov.uk |
| North Tyneside | northtyneside.gov.uk |
| North Warwickshire Borough | northwarks.gov.uk |
| North West Leicestershire District | nwleics.gov.uk |
| North Yorkshire | northyorks.gov.uk |
| Northampton Borough | northampton.gov.uk |
| Northumberland | northumberland.gov.uk |
| Norwich City | norwich.gov.uk |
| Nottingham City | nottinghamcity.gov.uk |
| Nuneaton and Bedworth Borough | nuneatonandbedworth.gov.uk |
| Oadby and Wigston Borough | oadby-wigston.gov.uk |
| Oldham Borough | oldham.gov.uk |
| Orkney Islands | scottishairquality.scot |
| Oxford City | oxford.gov.uk |
| Pembrokeshire | pembrokeshire.gov.uk |
| Pendle Borough | pendle.gov.uk |
| Perth and Kinross | pkc.gov.uk |
| Peterborough | peterborough.gov.uk |
| Plymouth City | plymouth.gov.uk |
| Poole Borough | boroughofpoole.com |
| Portsmouth City | portsmouth.gov.uk |
| Powys County | powys.gov.uk |
| Preston City | preston.gov.uk |
| Purbeck District | purbeck-dc.gov.uk |
| Reading Borough | reading.gov.uk |
| Redbridge | redbridge.gov.uk |
| Redcar and Cleveland Borough | redcar-cleveland.gov.uk |
| Redditch Borough | redditchbc.gov.uk |
| Reigate and Banstead Borough | reigate-banstead.gov.uk |
| Renfrewshire | renfrewshire.gov.uk |
| Rhondda-Cynon-Taff | rctcbc.gov.uk |
| Ribble Valley Borough | ribblevalley.gov.uk |
| Richmond upon Thames | richmond.gov.uk |
| Richmondshire District | richmondshire.gov.uk |
| Rochdale Borough | rochdale.gov.uk |
| Rochford District | rochford.gov.uk |
| Rossendale Borough | rossendale.gov.uk |
| Rother District | rother.gov.uk |
| Rotherham Borough | rotherham.gov.uk |
| Rugby Borough | rugby.gov.uk |
| Runnymede Borough | runnymede.gov.uk |
| Rushcliffe Borough | rushcliffe.gov.uk |
| Rushmoor Borough | rushmoor.gov.uk |
| Rutland County | rutland.gov.uk |
| Ryedale District | ryedale.gov.uk |
| Salford City | salford.gov.uk |
| Sandwell Borough | sandwell.gov.uk |
| Scarborough Borough | scarborough.gov.uk |
| Scottish Borders | scotborders.gov.uk |
| Sedgemoor District | sedgemoor.gov.uk |
| Sefton Borough | sefton.gov.uk |
| Selby District | selby.gov.uk |
| Sevenoaks District | sevenoaks.gov.uk |
| Sheffield City | sheffield.gov.uk |
| Shetland Islands | scottishairquality.scot |
| Shropshire | shropshire.gov.uk |
| Slough Borough | slough.gov.uk |
| Solihull Borough | solihull.gov.uk |
| Somerset | somerset.gov.uk |
| Somerset West and Taunton | somersetwestandtaunton.gov.uk |
| South Ayrshire | south-ayrshire.gov.uk |
| South Bucks District | southbucks.gov.uk |
| South Cambridgeshire District | scambs.gov.uk |
| South Derbyshire District | southderbyshire.gov.uk |
| South Gloucestershire | southglos.gov.uk |
| South Hams District | southhams.gov.uk |
| South Holland District | sholland.gov.uk |
| South Kesteven District | southkesteven.gov.uk |
| South Lakeland District | southlakeland.gov.uk |
| South Lanarkshire | scottishairquality.scot |
| South Norfolk District | southnorfolkandbroadland.gov.uk |
| South Northamptonshire | southnorthants.gov.uk |
| South Oxfordshire District | southoxon.gov.uk |
| South Ribble Borough | southribble.gov.uk |
| South Somerset District | southsomerset.gov.uk |
| South Staffordshire District | sstaffs.gov.uk |
| South Tyneside Borough | southtyneside.gov.uk |
| Southampton | southampton.gov.uk |
| Southend-on-Sea | southend.gov.uk |
| Southwark | southwark.gov.uk |
| Spelthorne Borough | spelthorne.gov.uk |
| St Albans City | stalbans.gov.uk |
| St Helens Borough | sthelens.gov.uk |
| Stafford Borough | staffordbc.gov.uk |
| Staffordshire Moorlands District | staffsmoorlands.gov.uk |
| Stevenage Borough | stevenage.gov.uk |
| Stirling | stirling.gov.uk |
| Stockport Borough | stockport.gov.uk |
| Stockton-on-Tees Borough | stockton.gov.uk |
| Stoke-on-Trent City | stoke.gov.uk |
| Stratford on Avon District | stratford.gov.uk |
| Stroud District | stroud.gov.uk |
| Sunderland City | sunderland.gov.uk |
| Surrey County | surreycc.gov.uk |
| Surrey Heath Borough | surreyheath.gov.uk |
| Sutton | sutton.gov.uk |
| Swale Borough | swale.gov.uk |
| Swindon Borough | swindon.gov.uk |
| Swansea | swansea.gov.uk |
| Tameside Borough | tameside.gov.uk |
| Tamworth Borough | tamworth.gov.uk |
| Tandridge District | tandridge.gov.uk |
| Teignbridge District | teignbridge.gov.uk |
| Telford and Wrekin | telford.gov.uk |
| Tendring District | tendringdc.gov.uk |
| Test Valley Borough | testvalley.gov.uk |
| Tewkesbury Borough | tewkesbury.gov.uk |
| Thanet District | thanet.gov.uk |
| Three Rivers District | threerivers.gov.uk |
| Thurrock | thurrock.gov.uk |
| Tonbridge and Malling Borough | tmbc.gov.uk |
| Torbay | torbay.gov.uk |
| Torfaen County Borough | torfaen.gov.uk |
| Torridge District | torridge.gov.uk |
| Tower Hamlets | towerhamlets.gov.uk |
| Trafford | trafford.gov.uk |
| Tunbridge Wells Borough | tunbridgewells.gov.uk |
| Uttlesford District | uttlesford.gov.uk |
| Vale of Glamorgan | srs.wales |
| Vale of White Horse District | whitehorsedc.gov.uk |
| Wakefield | wakefield.gov.uk |
| Walsall Borough | walsall.gov.uk |
| Waltham Forest | walthamforest.gov.uk |
| Wandsworth | wandsworth.gov.uk |
| Warrington Borough | warrington.gov.uk |
| Warwick District | warwickdc.gov.uk |
| Warwickshire County | warwickshire.gov.uk |
| Watford Borough | watford.gov.uk |
| Waverley Borough | waverley.gov.uk |
| Wealden District | wealden.gov.uk |
| Welwyn Hatfield Borough | welhat.gov.uk |
| West Berkshire | westberks.gov.uk |
| West Devon District | westdevon.gov.uk |
| West Dorset District | dorsetforyou.com |
| West Dunbartonshire | west-dunbarton.gov.uk |
| West Lancashire District | westlancs.gov.uk |
| West Lindsey District | west-lindsey.gov.uk |
| West Lothian | westlothian.gov.uk |
| West Northamptonshire | westnorthants.gov.uk |
| West Oxfordshire District | westoxon.gov.uk |
| West Suffolk | westsuffolk.gov.uk |
| West Sussex County | westsussex.gov.uk |
| Westmorland and Furness | westmorlandandfurness.gov.uk |
| Westminster | westminster.gov.uk |
| Weymouth and Portland Borough | dorsetcouncil.gov.uk |
| Wigan Borough | wigan.gov.uk |
| Wiltshire | wiltshire.gov.uk |
| Winchester City | winchester.gov.uk |
| Windsor and Maidenhead | rbwm.gov.uk |
| Wirral Borough | wirral.gov.uk |
| Woking Borough | woking.gov.uk |
| Wokingham Borough | wokingham.gov.uk |
| Wolverhampton City | wolverhampton.gov.uk |
| Worcester City | worcester.gov.uk |
| Worcestershire County | worcestershire.gov.uk |
| Worthing Borough | worthing.gov.uk |
| Wrexham County Borough | wrexham.gov.uk |
| Wychavon District | wychavon.gov.uk |
| Wycombe District | wycombe.gov.uk |
| Wyre Borough | wyre.gov.uk |
| Wyre Forest District | wyreforestdc.gov.uk |

### Planning System NI

| Council Name | Domain |
|--------------|--------|
| Planning System NI | planningregister.planningsystemni.gov.uk |

*If your local council isn't listed, feel free to open an issue or submit a Pull Request!*

## 🚀 Installation & Developer Guide

### Getting Started

Since the extension relies on zero build tools or external dependencies, getting started locally is incredibly simple:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmetyilmaz/UKPlanningApplicationDownloader.git
   cd UKPlanningApplicationDownloader
   ```

### Chrome, Brave, Edge

1. Open your browser's extension management page (e.g., `chrome://extensions/`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `src/` directory from the cloned repository.

### Safari

Safari requires a different setup process:

1. Open **Safari > Settings > Extensions**
2. Click **Allow Extension**
3. Click **Load Unpacked** and select the `src/` directory from the cloned repository
4. Grant necessary permissions when prompted

### Development Flow

- Any changes you make to the source files will reflect immediately after clicking the reload button (🔄) on the extension card.

### Browser Compatibility

| Browser | Support | Method | Features |
|---------|---------|--------|----------|
| Chrome  | Full    | API/Blob | Subfolders Supported |
| Edge    | Full    | API/Blob | Subfolders Supported |
| Firefox | Full    | Blob     | Universal Compatibility |
| Safari  | Full    | Blob     | Universal Compatibility |

## 🤝 Contributing

Contributions are always welcome! If you want to add support for a new planning portal:

### For Idox-based portals:
1. Fork the repository.
2. Add the portal's target URL pattern to the `matches` array in `manifest.json`.
3. Add the council to the supported list in this `README.md`.
4. Open a Pull Request!

### For Planning System NI portals:
1. Fork the repository.
2. Add both the main portal domain and API domain to the `matches` array in `manifest.json`.
3. Implement `isPlanningSystemNIPage()` detection in `content.js` if the API structure differs.
4. Add the council to the supported list in this `README.md`.
5. Open a Pull Request!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
**Acknowledgements**:
- This project is a fork of [StudioLE/PlanningApplicationDownloader](https://github.com/StudioLE/PlanningApplicationDownloader). Huge kudos to them for the original implementation!
- Construction Icon from the Noun Project under a Creative Commons license.