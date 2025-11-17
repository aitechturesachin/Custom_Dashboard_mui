import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import GroupIcon from '@mui/icons-material/Group';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../styles/stats-dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const FILTER_LABELS = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  ytd: 'Year to date',
  qoq: 'Quarter over quarter',
  mom: 'Month over month',
};

const CARD_CONFIGS = [
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

const CARD_DATA = {
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

const LAYOUT_PRESET = {
  lg: { w: 3, h: 2, minW: 2 },
  md: { w: 3, h: 2, minW: 2 },
  sm: { w: 6, h: 2, minW: 3 },
  xs: { w: 12, h: 2, minW: 3 },
};

const buildInitialLayouts = (cardOrder) => {
  const layouts = {};
  Object.entries(LAYOUT_PRESET).forEach(([breakpoint, config]) => {
    const perRow = Math.max(1, Math.floor(12 / config.w));
    layouts[breakpoint] = cardOrder.map((cardId, index) => ({
      i: cardId,
      x: (index % perRow) * config.w,
      y: Math.floor(index / perRow) * config.h,
      w: config.w,
      h: config.h,
      minW: config.minW,
      minH: 2,
    }));
  });
  return layouts;
};

const formatValue = (value, format) => {
  if (format === 'currency') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }
  if (format === 'percent') {
    return `${value.toFixed(1)}%`;
  }
  if (format === 'number') {
    return value.toLocaleString('en-US');
  }
  return value;
};

const StatsDashboard = () => {
  const allCardIds = useMemo(() => CARD_CONFIGS.map(card => card.id), []);
  const [visibleCards, setVisibleCards] = useState(allCardIds);
  const [cardFilters, setCardFilters] = useState(() =>
    CARD_CONFIGS.reduce((acc, card) => {
      acc[card.id] = card.defaultFilter;
      return acc;
    }, {})
  );
  const [layouts, setLayouts] = useState(() => buildInitialLayouts(allCardIds));
  const [menuAnchors, setMenuAnchors] = useState({});

  const handleLayoutChange = (_, updatedLayouts) => {
    setLayouts(updatedLayouts);
  };

  const handleRemoveCard = (cardId) => {
    setVisibleCards(prev => prev.filter(id => id !== cardId));
    setLayouts(prevLayouts => {
      const next = {};
      Object.keys(prevLayouts).forEach(key => {
        next[key] = (prevLayouts[key] || []).filter(item => item.i !== cardId);
      });
      return next;
    });
  };

  const handleRestoreCard = (cardId) => {
    if (visibleCards.includes(cardId)) return;
    setVisibleCards(prev => [...prev, cardId]);
    setLayouts(prevLayouts => {
      const next = {};
      Object.entries(LAYOUT_PRESET).forEach(([breakpoint, config]) => {
        const layout = prevLayouts[breakpoint] || [];
        const maxY = layout.length ? Math.max(...layout.map(item => item.y + item.h)) : 0;
        next[breakpoint] = [
          ...layout,
          {
            i: cardId,
            x: 0,
            y: maxY,
            w: config.w,
            h: config.h,
            minW: config.minW,
            minH: 2,
          },
        ];
      });
      return next;
    });
  };

  const handleResetCards = () => {
    setVisibleCards(allCardIds);
    setCardFilters(() =>
      CARD_CONFIGS.reduce((acc, card) => {
        acc[card.id] = card.defaultFilter;
        return acc;
      }, {})
    );
    setLayouts(buildInitialLayouts(allCardIds));
  };

  const openFilterMenu = (cardId, event) => {
    setMenuAnchors(prev => ({
      ...prev,
      [cardId]: event.currentTarget,
    }));
  };

  const closeFilterMenu = (cardId) => {
    setMenuAnchors(prev => ({
      ...prev,
      [cardId]: null,
    }));
  };

  const handleFilterChange = (cardId, filterKey) => {
    setCardFilters(prev => ({
      ...prev,
      [cardId]: filterKey,
    }));
    closeFilterMenu(cardId);
  };

  const removedCards = CARD_CONFIGS.filter(card => !visibleCards.includes(card.id));

  return (
    <Box className="stats-dashboard">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Executive Snapshot
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Drag, resize, remove, or filter each card to tailor the summary.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            startIcon={<RefreshIcon />}
            variant="outlined"
            size="small"
            onClick={handleResetCards}
          >
            Reset grid
          </Button>
          {removedCards.length > 0 && (
            <Chip
              color="primary"
              variant="outlined"
              label={`${removedCards.length} hidden`}
            />
          )}
        </Stack>
      </Stack>

      {removedCards.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {removedCards.map(card => (
            <Chip
              key={card.id}
              variant="outlined"
              label={`Restore ${card.title}`}
              onClick={() => handleRestoreCard(card.id)}
            />
          ))}
        </Stack>
      )}

      <ResponsiveGridLayout
        className="stats-grid"
        layouts={layouts}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 0 }}
        rowHeight={140}
        margin={[16, 16]}
        draggableHandle=".drag-handle"
        compactType="vertical"
        onLayoutChange={handleLayoutChange}
      >
        {visibleCards.map(cardId => {
          const config = CARD_CONFIGS.find(card => card.id === cardId);
          if (!config) return null;
          const selectedFilter = cardFilters[cardId] || config.defaultFilter;
          const stat = CARD_DATA[cardId]?.[selectedFilter];
          if (!stat) return null;
          const formattedValue = formatValue(stat.value, config.format);
          const changeLabel = `${stat.change > 0 ? '+' : ''}${stat.change.toFixed(1)}%`;
          const changeColor =
            stat.change > 0 ? 'success.main' : stat.change < 0 ? 'error.main' : 'text.secondary';

          return (
            <Box key={cardId}>
              <Card
                className="stat-card"
                sx={{
                  height: '100%',
                  borderTop: `5px solid ${config.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                }}
                elevation={3}
              >
                <CardHeader
                  title={
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {config.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {config.subtitle}
                      </Typography>
                    </Box>
                  }
                  avatar={
                    <Box
                      sx={{
                        bgcolor: `${config.accent}22`,
                        color: config.accent,
                        borderRadius: 1.5,
                        height: 40,
                        width: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {config.icon}
                    </Box>
                  }
                  action={
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {selectedFilter !== config.defaultFilter && (
                        <Chip
                          size="small"
                          label={FILTER_LABELS[selectedFilter]}
                          color="primary"
                          variant="outlined"
                        />
                      )}
                      <Tooltip title="Filter data">
                        <IconButton
                          size="small"
                          onClick={(event) => openFilterMenu(cardId, event)}
                        >
                          <FilterAltOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove card">
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveCard(cardId)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Drag to reposition">
                        <IconButton
                          size="small"
                          className="drag-handle"
                        >
                          <DragIndicatorIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" fontWeight={600}>
                    {formattedValue}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Typography variant="body2" sx={{ color: changeColor, fontWeight: 600 }}>
                      {changeLabel}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.comparison}
                    </Typography>
                  </Stack>
                </CardContent>
                <Menu
                  anchorEl={menuAnchors[cardId] || null}
                  open={Boolean(menuAnchors[cardId])}
                  onClose={() => closeFilterMenu(cardId)}
                >
                  {config.filters.map(filterKey => (
                    <MenuItem
                      key={filterKey}
                      selected={selectedFilter === filterKey}
                      onClick={() => handleFilterChange(cardId, filterKey)}
                    >
                      {FILTER_LABELS[filterKey] || filterKey}
                    </MenuItem>
                  ))}
                </Menu>
              </Card>
            </Box>
          );
        })}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default StatsDashboard;

