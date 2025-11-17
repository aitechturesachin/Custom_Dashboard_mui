import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import GroupIcon from '@mui/icons-material/Group';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const FILTER_LABELS = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  ytd: 'Year to date',
  qoq: 'Quarter over quarter',
  mom: 'Month over month',
};

export const CARD_CONFIGS = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    subtitle: 'Gross sales',
    accent: '#1565c0',
    icon: <TrendingUpIcon fontSize="small" />,
    defaultFilter: '30d',
    filters: ['7d', '30d', '90d', 'ytd'],
    format: 'currency',
  },
  {
    id: 'orders',
    title: 'Orders Fulfilled',
    subtitle: 'All channels',
    accent: '#2e7d32',
    icon: <ShoppingCartCheckoutIcon fontSize="small" />,
    defaultFilter: '30d',
    filters: ['7d', '30d', '90d'],
    format: 'number',
  },
  {
    id: 'customers',
    title: 'New Customers',
    subtitle: 'Net new accounts',
    accent: '#8e24aa',
    icon: <GroupIcon fontSize="small" />,
    defaultFilter: '30d',
    filters: ['7d', '30d', '90d'],
    format: 'number',
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    subtitle: 'Storefront',
    accent: '#00897b',
    icon: <PercentIcon fontSize="small" />,
    defaultFilter: '30d',
    filters: ['7d', '30d', '90d', 'mom'],
    format: 'percent',
  },
  {
    id: 'aov',
    title: 'Avg. Order Value',
    subtitle: 'Blended',
    accent: '#ef6c00',
    icon: <PaymentsIcon fontSize="small" />,
    defaultFilter: '30d',
    filters: ['7d', '30d', '90d'],
    format: 'currency',
  },
  {
    id: 'retention',
    title: 'Customer Retention',
    subtitle: 'Rolling 90 days',
    accent: '#3949ab',
    icon: <LoyaltyIcon fontSize="small" />,
    defaultFilter: '90d',
    filters: ['30d', '90d', 'ytd'],
    format: 'percent',
  },
  {
    id: 'support',
    title: 'Open Support Tickets',
    subtitle: 'All queues',
    accent: '#d81b60',
    icon: <SupportAgentIcon fontSize="small" />,
    defaultFilter: '7d',
    filters: ['7d', '30d', '90d'],
    format: 'number',
  },
  {
    id: 'nps',
    title: 'Net Promoter Score',
    subtitle: 'Survey data',
    accent: '#00838f',
    icon: <EmojiEventsIcon fontSize="small" />,
    defaultFilter: 'qoq',
    filters: ['qoq', 'mom', 'ytd'],
    format: 'number',
  },
];

export const CARD_DATA = {
  revenue: {
    '7d': { value: 58200, change: 6.1, comparison: 'vs previous 7 days' },
    '30d': { value: 254900, change: 11.3, comparison: 'vs previous 30 days' },
    '90d': { value: 712400, change: 8.4, comparison: 'vs previous quarter' },
    ytd: { value: 2148900, change: 14.2, comparison: 'vs YTD last year' },
  },
  orders: {
    '7d': { value: 1840, change: 4.2, comparison: 'vs previous 7 days' },
    '30d': { value: 7685, change: 7.1, comparison: 'vs previous 30 days' },
    '90d': { value: 21980, change: 5.4, comparison: 'vs previous quarter' },
  },
  customers: {
    '7d': { value: 620, change: 9.8, comparison: 'vs previous 7 days' },
    '30d': { value: 2485, change: 13.5, comparison: 'vs previous 30 days' },
    '90d': { value: 7060, change: 10.1, comparison: 'vs previous quarter' },
  },
  conversion: {
    '7d': { value: 3.6, change: 0.4, comparison: 'pts vs previous 7 days' },
    '30d': { value: 3.9, change: 0.6, comparison: 'pts vs previous 30 days' },
    '90d': { value: 4.1, change: 0.5, comparison: 'pts vs previous quarter' },
    mom: { value: 4.0, change: 0.2, comparison: 'pts MoM' },
  },
  aov: {
    '7d': { value: 86, change: 2.4, comparison: 'vs previous 7 days' },
    '30d': { value: 92, change: 3.1, comparison: 'vs previous 30 days' },
    '90d': { value: 88, change: -1.2, comparison: 'vs previous quarter' },
  },
  retention: {
    '30d': { value: 67, change: -2.3, comparison: 'pts vs previous 30 days' },
    '90d': { value: 72, change: 1.4, comparison: 'pts vs previous quarter' },
    ytd: { value: 74, change: 2.8, comparison: 'pts vs YTD last year' },
  },
  support: {
    '7d': { value: 142, change: -5.6, comparison: 'vs previous 7 days' },
    '30d': { value: 610, change: -3.2, comparison: 'vs previous 30 days' },
    '90d': { value: 1840, change: 1.1, comparison: 'vs previous quarter' },
  },
  nps: {
    qoq: { value: 58, change: 4.0, comparison: 'pts QoQ' },
    mom: { value: 55, change: 1.8, comparison: 'pts MoM' },
    ytd: { value: 61, change: 5.7, comparison: 'pts vs YTD last year' },
  },
};

