/**
 * CivicTrack - API Service Layer
 * Decouples UI components from backend / data sources.
 * Production-ready for REST / GraphQL endpoints.
 */

import {
  mpDetailsData,
  attentionAlertsContractData,
  evidenceContractData,
  userProfileContractData
} from '../data/mockData.js';

/**
 * Fetch Member of Parliament details by ID
 * @param {string} mpId - Identifier of MP (default: 'mp-1')
 * @returns {Promise<Object>} MP details dossier
 */
export async function getMPById(mpId = 'mp-1') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mpDetailsData);
    }, 120);
  });
}

/**
 * Fetch MP projects with optional filtering
 * @param {string} mpId - MP identifier
 * @param {Object} filters - { category, status, search }
 * @returns {Promise<Array>} List of project objects
 */
export async function getMPProjects(mpId = 'mp-1', filters = {}) {
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
    }, 100);
  });
}

/**
 * Fetch Attention Center alerts
 * @param {Object} filters - { severity, search, status }
 * @returns {Promise<Array>} List of alerts matching data contract
 */
export async function getAlerts(filters = {}) {
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
    }, 120);
  });
}

/**
 * Fetch individual alert by Alert ID
 * @param {string} alertId - Alert identifier
 * @returns {Promise<Object|null>} Alert object
 */
export async function getAlertById(alertId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alert = attentionAlertsContractData.find((a) => a.alertId === alertId);
      resolve(alert || null);
    }, 80);
  });
}

/**
 * Fetch Evidence Library items
 * @param {Object} filters - { projectId, type, search, dateRange }
 * @returns {Promise<Array>} List of evidence records matching data contract
 */
export async function getEvidence(filters = {}) {
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
    }, 120);
  });
}

/**
 * Fetch administrator profile details
 * @returns {Promise<Object>} Profile object
 */
export async function getProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfileContractData);
    }, 100);
  });
}
