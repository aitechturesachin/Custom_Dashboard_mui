import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../../styles/stats-dashboard.css";
import { CARD_CONFIGS, CARD_DATA, FILTER_LABELS } from "../../constants/kpiCards.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

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
  if (format === "currency") {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }
  if (format === "percent") {
    return `${value.toFixed(1)}%`;
  }
  if (format === "number") {
    return value.toLocaleString("en-US");
  }
  return value;
};

const StatsDashboard = () => {
  const allCardIds = useMemo(() => CARD_CONFIGS.map((card) => card.id), []);
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
    setVisibleCards((prev) => prev.filter((id) => id !== cardId));
    setLayouts((prevLayouts) => {
      const next = {};
      Object.keys(prevLayouts).forEach((key) => {
        next[key] = (prevLayouts[key] || []).filter(
          (item) => item.i !== cardId
        );
      });
      return next;
    });
  };

  const handleRestoreCard = (cardId) => {
    if (visibleCards.includes(cardId)) return;
    setVisibleCards((prev) => [...prev, cardId]);
    setLayouts((prevLayouts) => {
      const next = {};
      Object.entries(LAYOUT_PRESET).forEach(([breakpoint, config]) => {
        const layout = prevLayouts[breakpoint] || [];
        const maxY = layout.length
          ? Math.max(...layout.map((item) => item.y + item.h))
          : 0;
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
    setMenuAnchors((prev) => ({
      ...prev,
      [cardId]: event.currentTarget,
    }));
  };

  const closeFilterMenu = (cardId) => {
    setMenuAnchors((prev) => ({
      ...prev,
      [cardId]: null,
    }));
  };

  const handleFilterChange = (cardId, filterKey) => {
    setCardFilters((prev) => ({
      ...prev,
      [cardId]: filterKey,
    }));
    closeFilterMenu(cardId);
  };

  const removedCards = CARD_CONFIGS.filter(
    (card) => !visibleCards.includes(card.id)
  );

  return (
    <Box className="stats-dashboard">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            KPI CARDS
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
          {removedCards.map((card) => (
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
        {visibleCards.map((cardId) => {
          const config = CARD_CONFIGS.find((card) => card.id === cardId);
          if (!config) return null;
          const selectedFilter = cardFilters[cardId] || config.defaultFilter;
          const stat = CARD_DATA[cardId]?.[selectedFilter];
          if (!stat) return null;
          const formattedValue = formatValue(stat.value, config.format);
          const changeLabel = `${
            stat.change > 0 ? "+" : ""
          }${stat.change.toFixed(1)}%`;
          const changeColor =
            stat.change > 0
              ? "success.main"
              : stat.change < 0
              ? "error.main"
              : "text.secondary";

          return (
            <Box key={cardId}>
              <Card
                className="stat-card"
                sx={{
                  height: "100%",
                  borderTop: `5px solid ${config.accent}`,
                  display: "flex",
                  flexDirection: "column",
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                        <IconButton size="small" className="drag-handle">
                          <DragIndicatorIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
                <Divider />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h4" fontWeight={600}>
                    {formattedValue}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Typography
                      variant="body2"
                      sx={{ color: changeColor, fontWeight: 600 }}
                    >
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
                  {config.filters.map((filterKey) => (
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
