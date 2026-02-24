/**
 * UK Planning Application Downloader - Background Script
 * Handles downloading files into subfolders using the downloads API.
 * This is primarily for Chrome/Edge support.
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download') {
        const { url, filename } = message;

        chrome.downloads.download({
            url: url,
            filename: filename,
            conflictAction: 'uniquify'
        }, (downloadId) => {
            if (chrome.runtime.lastError) {
                console.error('Download failed:', chrome.runtime.lastError.message);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ success: true, downloadId: downloadId });
            }
        });

        return true; // Asynchronous response
    }
});
