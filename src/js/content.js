/**
 * UK Planning Application Downloader - Content Script
 * Works in all browsers using blob download method
 */

/**
 * Extract filename from URL
 */
const getFilenameFromUrl = (url) => {
    try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname
        const segments = pathname.split('/')
        const filename = segments[segments.length - 1]
        return filename || 'document'
    } catch (e) {
        return 'document'
    }
}

/**
 * Download using blob method (works in all browsers)
 */
const downloadWithBlob = async (url, filename) => {
    try {
        const response = await fetch(url)
        const blob = await response.blob()

        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = filename || 'download'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl)
        }, 100)

        return true
    } catch (error) {
        console.error('Blob download failed:', error)
        return false
    }
}

/**
 * Download a single asset
 */
const downloadAsset = async (asset) => {
    let url = asset.href
    let basename = getFilenameFromUrl(url) || asset.filename || asset.title

    if (asset.content) {
        const encodedContent = encodeURIComponent(asset.content)
        url = `data:${asset.contentType || 'text/plain'};charset=utf-8,${encodedContent}`
        if (asset.filename) basename = asset.filename
    }

    // Target browser detection
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const isEdge = /Edg/.test(navigator.userAgent)

    if ((isChrome || isEdge) && typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        const filename = asset.folder ? `${asset.folder}/${basename}` : basename
        // Use background script for reliable folder creation on Chrome/Edge
        try {
            chrome.runtime.sendMessage({
                action: 'download',
                url: url,
                filename: filename
            })
        } catch (e) {
            console.warn('Failed to send download message, falling back to blob:', e)
            await downloadWithBlob(url, basename)
        }
    } else {
        // Fallback for Safari and other browsers
        // Folders are not supported in basic blob downloads, so we use original basename
        // to avoid ugly prefixes as requested by the user.
        await downloadWithBlob(url, basename)
    }
}

/**
 * Download all assets
 */
const downloadAssets = (assets) => {
    assets.forEach((asset, index) => {
        setTimeout(() => {
            downloadAsset(asset)
        }, index * 200)
    })
}

/**
 * UI utility for displaying a temporary toast notification on the page.
 */
const showToast = (message, duration = 3000) => {
    const existingToast = document.getElementById('pad-toast-container')
    if (existingToast) {
        existingToast.remove()
    }

    const toast = document.createElement('div')
    toast.id = 'pad-toast-container'
    toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  `
    toast.innerText = message
    document.body.appendChild(toast)

    requestAnimationFrame(() => {
        toast.style.opacity = '1'
    })

    setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => toast.remove(), 300)
    }, duration)
}

/**
 * Create a floating download button
 */
const createDownloadButton = () => {
    console.log('=== createDownloadButton called ===');
    if (document.getElementById('pad-download-button')) {
        console.log('Button already exists, skipping');
        return
    }

    console.log('Creating new download button...');

    const button = document.createElement('button')
    button.id = 'pad-download-button'
    button.textContent = '⬇ Download All'
    button.title = 'Download all planning documents'
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999998;
        background-color: #10B981;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: background-color 0.2s ease;
    `
    button.onmouseover = () => {
        button.style.backgroundColor = '#059669'
    }
    button.onmouseout = () => {
        button.style.backgroundColor = '#10B981'
    }
    button.onclick = async () => {
        console.log('=== Download button clicked ===');
        console.log('isPlanningSystemNIPage():', isPlanningSystemNIPage());
        
        if (isPlanningSystemNIPage()) {
            console.log('Calling handleNIPortalDownload...');
            await handleNIPortalDownload();
        } else {
            // Check if already on documents page
            const urlParams = new URLSearchParams(window.location.search);
            const activeTab = urlParams.get('activeTab');
            
            if (activeTab !== 'documents') {
                // Navigate to documents page
                showToast('Navigating to documents...');
                const docsTab = document.querySelector('#tab_documents, a[href*="activeTab=documents"]');
                if (docsTab) {
                    docsTab.click();
                    // Wait for page to navigate
                    await new Promise(resolve => setTimeout(resolve, 1500));
                } else {
                    // Try to construct the URL
                    const currentUrl = window.location.href;
                    const docsUrl = currentUrl.includes('?') 
                        ? `${currentUrl}&activeTab=documents`
                        : `${currentUrl}?activeTab=documents`;
                    window.location.href = docsUrl;
                    return;
                }
            }
            
            // Now download
            showToast('Preparing downloads...')
            const details = await fetchAppDetails()
            const folderName = `${details.reference} ${details.address}`.trim()
            const sanitizedFolder = folderName.replace(/[<>:"/\\|?*]/g, '_')

            getIdoxAssets(sanitizedFolder)
            getIdoxSummary(sanitizedFolder)
        }
    }

    document.body.appendChild(button)
    console.log('Button created and appended to body');
}


/**
 * Get all asset ids for Idox pages
 */
const getIdoxAssets = (folder = '') => {
    const assets = []
    let download_column, title_column

    const headers = document.querySelectorAll('#Documents tr:first-child th')
    headers.forEach((th, index) => {
        const headerText = th.textContent.trim().toLowerCase()
        if (headerText === 'view') {
            download_column = index + 1
        } else {
            const a = th.querySelector('a')
            const linkText = a ? a.textContent.trim().toLowerCase() : ''
            if (linkText === 'description') {
                title_column = index + 1
            }
        }
    })

    if (!download_column || !title_column) {
        console.error('Failed to detect document columns. Download column:', download_column, 'Title column:', title_column)
        showToast('Failed to find document columns. Page structure may have changed.')
        return
    }

    const links = document.querySelectorAll(`#Documents td:nth-child(${download_column}) a`)
    links.forEach(link => {
        const tr = link.closest('tr')
        const titleTd = tr.querySelector(`td:nth-child(${title_column})`)
        assets.push({
            href: window.location.origin + link.getAttribute('href'),
            title: titleTd ? titleTd.textContent : '',
            folder: folder
        })
    })

    console.log('UK Planning Application Downloader is fetching the application summary')

    if (assets.length > 0) {
        showToast(`Downloading ${assets.length} documents...`)
        downloadAssets(assets)
    } else {
        showToast('No documents found to download.')
    }
}



/**
 * Get application summary
 */
const getIdoxSummary = async (folder = '') => {
    console.log('Planning Application Downloader is fetching the application summary')

    const summary = {}

    const summaryTab = document.querySelector('#tab_summary')
    if (!summaryTab) return

    const href = summaryTab.getAttribute('href')
    if (!href) {
        console.error('Summary tab has no href attribute')
        return
    }

    summary.url = window.location.origin + href

    try {
        const response = await fetch(summary.url)
        const data = await response.text()

        const parser = new DOMParser()
        const docHtml = parser.parseFromString(data, 'text/html')
        const rows = docHtml.querySelectorAll('#simpleDetailsTable tr')

        rows.forEach(row => {
            const th = row.querySelector('th')
            const td = row.querySelector('td')

            if (th && td) {
                const key = th.innerHTML.trim()
                const value = td.innerHTML.trim()
                summary[key] = value
            }
        })

        console.log(summary)

        const json = JSON.stringify(summary, undefined, 2)

        const details = await fetchAppDetails()
        const sanitizedRef = details.reference.replace(/[<>:"/\\|?*]/g, '_')
        const sanitizedAddr = details.address.replace(/[<>:"/\\|?*]/g, '_')
        const filename = `${sanitizedRef} ${sanitizedAddr}`.trim() + '.json'

        const assets = [{
            content: json,
            contentType: 'application/json',
            title: 'Application Summary',
            filename: filename,
            folder: folder
        }]

        console.log('UK Planning Application Downloader is triggering summary download:', assets)

        showToast('Downloading application summary...')
        downloadAssets(assets)
    } catch (error) {
        console.error('Failed to get Application Summary:', error)
    }
}

/**
 * Fetch the application details (Reference and Address)
 */
const fetchAppDetails = async () => {
    const details = { reference: 'Unknown', address: '' }

    // Helper to extract from a table or description
    const extractFromText = (text) => {
        const refMatch = text.match(/Reference\s*:\s*([^\n\r]+)/i)
        const addrMatch = text.match(/Address\s*:\s*([^\n\r]+)/i)
        if (refMatch && refMatch[1]) details.reference = refMatch[1].trim()
        if (addrMatch && addrMatch[1]) details.address = addrMatch[1].trim()
    }

    // Try current page first
    const possibleSelectors = ['.description', '#simpleDetailsTable', '.application_details', '#simpleDetailsTable']
    possibleSelectors.forEach(selector => {
        const el = document.querySelector(selector)
        if (el) extractFromText(el.textContent)
    })

    // If we still lack details, try fetching summary tab
    if (details.reference === 'Unknown' || !details.address) {
        const summaryTab = document.querySelector('#tab_summary')
        if (summaryTab) {
            const href = summaryTab.getAttribute('href')
            if (href) {
                try {
                    const response = await fetch(window.location.origin + href)
                    const data = await response.text()
                    const parser = new DOMParser()
                    const docHtml = parser.parseFromString(data, 'text/html')
                    const rows = docHtml.querySelectorAll('#simpleDetailsTable tr')

                    rows.forEach(row => {
                        const th = row.querySelector('th')
                        const td = row.querySelector('td')
                        if (th && td) {
                            const key = th.textContent.trim().toLowerCase()
                            if (key === 'reference') details.reference = td.textContent.trim()
                            if (key === 'address') details.address = td.textContent.trim()
                        }
                    })
                } catch (e) {
                    console.error('Failed to fetch details from summary tab:', e)
                }
            }
        }
    }

    return details
}

/**
 * Check if the current page is a document list page (Idox)
 */
const isDocumentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('activeTab');
    const url = window.location.href;

    // Idox portals - either on documents tab or on applicationDetails.do page
    if (activeTab === 'documents') {
        return true;
    }
    
    // Also show button on applicationDetails.do pages
    if (url.includes('applicationDetails.do')) {
        return true;
    }

    return false;
}

/**
 * Detect if we are on Planning System NI portal
 */
const isPlanningSystemNIPage = () => {
    const url = window.location.href;
    const host = window.location.host;
    return host === 'planningregister.planningsystemni.gov.uk' &&
        url.includes('/application/');
}

/**
 * Handle downloads from Planning System NI portal
 */
const handleNIPortalDownload = async () => {
    console.log('=== NI Portal Download Started ===');
    showToast('Fetching document list...');

    const url = window.location.href;
    const refMatch = url.match(/\/application\/(\d+)/);
    const applicationId = refMatch ? refMatch[1] : '';

    console.log('URL:', url);
    console.log('Application ID:', applicationId);

    if (!applicationId) {
        console.error('Could not extract application ID from URL');
        showToast('Could not find application ID');
        return;
    }

    const reference = applicationId;
    
    // API headers
    const getApiHeaders = () => ({
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,tr;q=0.7",
        "request-id": "|6d81fb0285104042aee27e95b9b753d1.891f876f78914a88",
        "sec-ch-ua": "\"Not:A-Brand\";v=\"99\", \"Google Chrome\";v=\"145\", \"Chromium\";v=\"145\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "tq-tenant": "cfb86436-414d-4459-9545-93eec37615a2",
        "traceparent": "00-6d81fb0285104042aee27e95b9b753d1-891f876f78914a88-01",
        "referrer": "https://planningregister.planningsystemni.gov.uk/"
    });

    const apiBaseUrl = 'https://api-planningregister-planningportal.pr.tqinfra.co.uk';
    const applicationEndpoint = `${apiBaseUrl}/api/v1/application/${applicationId}`;

    console.log('=== Step 1: Fetching application data ===');
    console.log('Endpoint:', applicationEndpoint);
    console.log('Headers:', JSON.stringify(getApiHeaders(), null, 2));

    try {
        // Step 1: Get application data to find document IDs
        const appResponse = await fetch(applicationEndpoint, {
            headers: getApiHeaders(),
            method: 'GET',
            mode: 'cors',
            credentials: 'omit'
        });

        console.log('Response status:', appResponse.status);
        console.log('Response statusText:', appResponse.statusText);
        console.log('Response headers:', [...appResponse.headers.entries()]);

        if (!appResponse.ok) {
            const errorText = await appResponse.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Application API error: ${appResponse.status} - ${errorText}`);
        }

        const appData = await appResponse.json();
        console.log('=== Application Data Received ===');
        console.log('Full Response:', JSON.stringify(appData, null, 2));

        // Extract address from application data
        let address = '';
        const searchForAddress = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            // Look for address-related fields
            const addressKeys = ['address', 'locationAddress', 'siteAddress', 'propertyAddress'];
            for (const key of addressKeys) {
                if (obj[key] && typeof obj[key] === 'string') {
                    console.log(`Found address at ${path}.${key}:`, obj[key]);
                    address = obj[key];
                    return;
                }
            }

            // Recursively search
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object' && address === '') {
                    searchForAddress(obj[key], `${path}.${key}`);
                }
            }
        };

        searchForAddress(appData);

        console.log('Extracted Address:', address);
        
        // Create folder name with address
        const folderName = address ? `${reference} ${address}` : reference;
        const sanitizedFolder = folderName.replace(/[<>:"/\\|?*]/g, '_');
        console.log('Folder name:', sanitizedFolder);
        
        // Extract document IDs from the response - check ALL possible locations
        let documentIds = [];

        console.log('=== Searching for document IDs ===');

        // Try various possible structures
        const searchForDocuments = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            // Check if this looks like a document
            if (obj.id && (obj.documentId || obj.documentID || obj.fileId)) {
                console.log(`Found document at ${path}:`, obj);
                documentIds.push(obj.id || obj.documentId || obj.documentID || obj.fileId);
            }

            // Check if this is an array of documents
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    if (item && typeof item === 'object') {
                        if (item.id || item.documentId || item.documentID || item.fileId) {
                            console.log(`Found document in array at ${path}[${index}]:`, item);
                            documentIds.push(item.id || item.documentId || item.documentID || item.fileId);
                        }
                    }
                });
            }

            // Recursively search
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    searchForDocuments(obj[key], `${path}.${key}`);
                }
            }
        };

        searchForDocuments(appData);

        // Also try common key names directly
        const commonKeys = ['documents', 'applicationDocuments', 'files', 'attachments', 'applicationFiles', 'docs'];
        for (const key of commonKeys) {
            if (appData[key]) {
                console.log(`Found documents in appData.${key}:`, appData[key]);
                if (Array.isArray(appData[key])) {
                    appData[key].forEach((doc, idx) => {
                        const id = doc.id || doc.documentId || doc.documentID || doc.fileId;
                        if (id) documentIds.push(id);
                    });
                }
            }
        }

        // Deduplicate
        documentIds = [...new Set(documentIds)];

        console.log('=== Final Document IDs ===');
        console.log('Document IDs:', documentIds);
        console.log('Count:', documentIds.length);

        if (documentIds.length === 0) {
            console.error('=== No documents found ===');
            console.log('Full response structure:', Object.keys(appData));
            showToast('No documents found in response');
            return;
        }

        showToast(`Found ${documentIds.length} documents, fetching download links...`);

        console.log('=== Step 2: Fetching document URLs in parallel ===');

        // Step 2: Get download URLs for all documents in parallel
        const documentPromises = documentIds.map(async (docId, index) => {
            const docEndpoint = `${apiBaseUrl}/api/v1/application/${applicationId}/${docId}`;
            console.log(`Fetching document ${index + 1}/${documentIds.length}: ${docEndpoint}`);

            try {
                const docResponse = await fetch(docEndpoint, {
                    headers: getApiHeaders(),
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit'
                });

                console.log(`Document ${docId} response status:`, docResponse.status);

                if (!docResponse.ok) {
                    const errorText = await docResponse.text();
                    console.error(`Failed to fetch document ${docId}:`, docResponse.status, errorText);
                    return null;
                }

                const docData = await docResponse.json();
                console.log(`Document ${docId} data:`, JSON.stringify(docData, null, 2));

                // Extract download URL from response
                let downloadUrl = docData.documentUri || docData.url || docData.downloadUrl || docData.fileUrl || docData.link;

                if (!downloadUrl) {
                    console.warn(`No download URL found for document ${docId}`);
                    console.warn('Available keys:', Object.keys(docData));
                    return null;
                }

                console.log(`Download URL for ${docId}:`, downloadUrl);

                // Extract filename from URL
                let filename = 'document';
                try {
                    const urlObj = new URL(downloadUrl);
                    const pathParts = urlObj.pathname.split('/');
                    filename = pathParts[pathParts.length - 1];
                    filename = decodeURIComponent(filename);
                } catch (e) {
                    console.warn('Failed to parse filename from URL:', e);
                }

                console.log(`Filename for ${docId}:`, filename);

                return {
                    href: downloadUrl,
                    title: filename,
                    filename: filename,
                    folder: sanitizedFolder
                };
            } catch (err) {
                console.error(`Error fetching document ${docId}:`, err);
                return null;
            }
        });

        const documents = await Promise.all(documentPromises);

        // Filter out failed downloads
        const assets = documents.filter(doc => doc !== null);

        console.log('=== Final Assets ===');
        console.log('Total assets:', assets.length);
        console.log('Assets:', assets);

        if (assets.length > 0) {
            console.log('=== Starting downloads ===');
            showToast(`Downloading ${assets.length} documents...`);
            downloadAssets(assets);
        } else {
            showToast('No documents could be downloaded');
        }

    } catch (error) {
        console.error('=== Error in NI Portal Download ===');
        console.error('Error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        showToast('Failed to fetch documents. See console for details.');
    }
}

/**
 * Initialize - create download button if on supported planning page
 */
const init = () => {
    console.log('=== Extension Initializing ===');
    console.log('Current URL:', window.location.href);
    console.log('Current Host:', window.location.host);
    console.log('Is Idox Document Page:', isDocumentPage());
    console.log('Is NI Portal Page:', isPlanningSystemNIPage());

    const checkAndCreateButton = () => {
        console.log('=== checkAndCreateButton called ===');
        console.log('isDocumentPage():', isDocumentPage());
        console.log('isPlanningSystemNIPage():', isPlanningSystemNIPage());

        if (isDocumentPage() || isPlanningSystemNIPage()) {
            console.log('Creating download button...');
            createDownloadButton()
        } else {
            console.log('Not a supported page, skipping button creation');
        }
    }

    // Initial check
    checkAndCreateButton()

    // For SPAs - observe DOM changes and URL changes
    let lastUrl = location.href;
    console.log('Initial URL:', lastUrl);

    // Watch for URL changes (SPA navigation)
    const urlObserver = new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            console.log('=== URL Changed ===');
            console.log('Old URL:', lastUrl);
            console.log('New URL:', url);
            lastUrl = url;
            const existingButton = document.getElementById('pad-download-button');
            if (existingButton) {
                existingButton.remove();
            }
            setTimeout(checkAndCreateButton, 1000);
        }
    });

    // Watch for DOM changes (React re-renders)
    const domObserver = new MutationObserver((mutations) => {
        const button = document.getElementById('pad-download-button');
        // Check if main content area has loaded
        const mainContent = document.querySelector('main') || document.querySelector('[class*="content"]');

        if (mainContent && !button && (isDocumentPage() || isPlanningSystemNIPage())) {
            checkAndCreateButton();
        }
    });

    urlObserver.observe(document.body, { subtree: true, childList: true });
    domObserver.observe(document.body, { subtree: true, childList: true, attributes: true });
    console.log('=== Observers Set Up ===');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}