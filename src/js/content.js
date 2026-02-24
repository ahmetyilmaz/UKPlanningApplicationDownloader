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
    bottom: 20px;
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
    if (document.getElementById('pad-download-button')) {
        return
    }

    const button = document.createElement('button')
    button.id = 'pad-download-button'
    button.textContent = '⬇ Download All'
    button.title = 'Download all planning documents'
    button.style.cssText = `
        position: fixed;
        top: 20px;
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
        showToast('Preparing downloads...')
        const details = await fetchAppDetails()
        const folderName = `${details.reference} ${details.address}`.trim()
        const sanitizedFolder = folderName.replace(/[<>:"/\\|?*]/g, '_')

        getIdoxAssets(sanitizedFolder)
        getIdoxSummary(sanitizedFolder)
    }

    document.body.appendChild(button)
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
 * Check if the current page is a document list page
 */
const isDocumentPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('activeTab');
    const host = window.location.host;

    // Idox portals
    if (activeTab === 'documents') {
        return true;
    }

    return false;
}

/**
 * Initialize - create download button if on document page
 */
const init = () => {
    if (isDocumentPage()) {
        createDownloadButton()
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
