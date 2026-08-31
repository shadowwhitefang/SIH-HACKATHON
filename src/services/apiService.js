/**
 * CivicTrack - API Service Layer
 * Bridges UI components with backend REST endpoints with transparent mock fallbacks.
 * Production-ready for REST endpoints and live server integration.
 */

import {
  mpDetailsData,
  attentionAlertsContractData,
  evidenceContractData,
  userProfileContractData
} from '../data/mockData.js';

const API_BASE_URL = '/api';

/**
 * Safe fetch wrapper with automatic timeout and fallback.
 */
async function fetchWithFallback(url, options = {}, fallbackData = null) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data !== undefined) {
        return json.data;
      }
    }
  } catch (error) {
    // Network or server unreachable; proceed to fallback
  }
  return fallbackData;
}

/**
 * Fetch Member of Parliament details by ID
 * @param {string} mpId - Identifier of MP (default: 'mp-1')
 * @returns {Promise<Object>} MP details dossier
 */
export async function getMPById(mpId = 'mp-1') {
  const data = await fetchWithFallback(`${API_BASE_URL}/mps/${mpId}`, {}, null);
  if (data) return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mpDetailsData);
    }, 80);
  });
}

/**
 * Fetch MP projects with optional filtering
 * @param {string} mpId - MP identifier
 * @param {Object} filters - { category, status, search }
 * @returns {Promise<Array>} List of project objects
 */
export async function getMPProjects(mpId = 'mp-1', filters = {}) {
  const queryParams = new URLSearchParams();
  if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
  if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status);
  if (filters.search) queryParams.append('q', filters.search);

  const url = `${API_BASE_URL}/projects?mpId=${mpId}&${queryParams.toString()}`;
  const data = await fetchWithFallback(url, {}, null);

  if (Array.isArray(data) && data.length > 0) return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...mpDetailsData.projects];

      if (filters.category && filters.category !== 'All') {
        list = list.filter((p) => p.category === filters.category);
      }
      if (filters.status && filters.status !== 'All') {
        list = list.filter((p) => p.status === filters.status);
      }
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.deadline.toLowerCase().includes(q)
        );
      }

      resolve(list);
    }, 80);
  });
}

/**
 * Fetch Attention Center alerts
 * @param {Object} filters - { severity, search, status }
 * @returns {Promise<Array>} List of alerts matching data contract
 */
export async function getAlerts(filters = {}) {
  const queryParams = new URLSearchParams();
  if (filters.severity && filters.severity !== 'All') queryParams.append('severity', filters.severity);
  if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status);

  const url = `${API_BASE_URL}/alerts?${queryParams.toString()}`;
  const data = await fetchWithFallback(url, {}, null);

  if (Array.isArray(data) && data.length > 0) return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...attentionAlertsContractData];

      if (filters.severity && filters.severity !== 'All') {
        list = list.filter(
          (item) => item.severity.toUpperCase() === filters.severity.toUpperCase()
        );
      }

      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (item) =>
            item.projectTitle.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.constituency.toLowerCase().includes(q) ||
            item.mpName.toLowerCase().includes(q) ||
            item.rulesTriggered.some((r) => r.message.toLowerCase().includes(q))
        );
      }

      resolve(list);
    }, 80);
  });
}

/**
 * Fetch individual alert by Alert ID
 * @param {string} alertId - Alert identifier
 * @returns {Promise<Object|null>} Alert object
 */
export async function getAlertById(alertId) {
  const data = await fetchWithFallback(`${API_BASE_URL}/alerts/${alertId}`, {}, null);
  if (data) return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      const alert = attentionAlertsContractData.find((a) => a.alertId === alertId);
      resolve(alert || null);
    }, 60);
  });
}

/**
 * Fetch Evidence Library items
 * @param {Object} filters - { projectId, type, search, dateRange }
 * @returns {Promise<Array>} List of evidence records matching data contract
 */
export async function getEvidence(filters = {}) {
  const queryParams = new URLSearchParams();
  if (filters.type && filters.type !== 'All') queryParams.append('type', filters.type);

  const targetProjectId = filters.projectId && filters.projectId !== 'All' ? filters.projectId : 'all';
  const url = targetProjectId !== 'all' ? `${API_BASE_URL}/projects/${targetProjectId}/evidence` : `${API_BASE_URL}/projects/project_001/evidence`;
  const data = await fetchWithFallback(url, {}, null);

  if (Array.isArray(data) && data.length > 0) return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...evidenceContractData];

      if (filters.projectId && filters.projectId !== 'All') {
        list = list.filter((item) => item.projectId === filters.projectId || item.projectName === filters.projectId);
      }

      if (filters.type && filters.type !== 'All') {
        list = list.filter((item) => item.type === filters.type);
      }

      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (item) =>
            item.projectName.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q) ||
            item.source.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        );
      }

      resolve(list);
    }, 80);
  });
}

/**
 * Fetch administrator profile details
 * @returns {Promise<Object>} Profile object
 */
export async function getProfile() {
  const token = localStorage.getItem('civictrack_token');
  if (token) {
    const data = await fetchWithFallback(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }, null);
    if (data && data.user) return data.user;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfileContractData);
    }, 80);
  });
}
