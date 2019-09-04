import { cloneDeep, sampleSize } from "lodash";

export function createRandomLayout(kitItems, bounds, config) {
  if (!kitItems.length) {
    return [];
  }

  // create an empty array.
  const orbCollection = [];
  // create a number of orbs based on each kitItems weighting to achieve the correct distribution. Add the x, y, and velocity properties to its existing properties for that item
  for (let i = 0; i < kitItems.length; i += 1) {
    const kitData = kitItems[i];
    const totalGeneratedOrbs = Math.round(config.orbCount * kitData.weighting);

    for (let j = 0; j < totalGeneratedOrbs; j += 1) {
      const orbId = `${kitData.type}-${j}`;
      kitData.x = Math.random() * bounds.width;
      kitData.y = Math.random() * (bounds.height - config.orbSize * 2);
      kitData.velocity = {
        x:
          config.minVelocityX +
          Math.random() * (config.maxVelocityX - config.minVelocityX),
        y:
          config.minVelocityY +
          Math.random() * (config.maxVelocityY - config.minVelocityY)
      };

      orbCollection.push(
        Object.assign({}, { orbId }, { touched: false }, kitData)
      );
    }
  }

  return orbCollection;
}

// createFixedLayout is responsible for
// creating orbModels,
// laying them out in a grid
// and setting a `delay` in each orb for sequential animations
//
// use `totalGeneratedOrbs` to control how many orbs should be made at once
// note that this creates `n` number of orbs based on what's found in the kit
//
// use `columnsInRow` to define how many columns (ie instances across, remember columns hold things up)
// the grid will auto populate the number of rows required to display all the orbs
export function createFixedLayout(
  kitItems,
  bounds,
  config,
  totalGeneratedOrbs = 50,
  columnsInRow = 15
) {
  if (!kitItems.length) {
    return [];
  }

  // create an empty array.
  let orbCollection = [];

  for (let i = 0, orbCount = kitItems.length; i < orbCount; i += 1) {
    const kitData = kitItems[i];
    const jCount = totalGeneratedOrbs / orbCount;

    for (let j = 0; j < jCount; j += 1) {
      const orbId = `${kitData.type}-${j}`;
      kitData.x = 0;
      kitData.y = 0;
      kitData.velocity = {
        x: 0,
        y: 0
      };

      orbCollection.push(
        Object.assign({}, { orbId }, { touched: false }, kitData)
      );
    }
  }

  // rearranges the orbs so the layout appears random
  orbCollection = sampleSize(orbCollection, orbCollection.length);

  // perform some grid-related calculations to derive
  // rows (we already know columns from function args),
  // rowHeight and columnWidth
  // be sure to account for verticalBuffer
  // and orbSize (remember orb's 0,0 coordinate is its own top-left, not center of component)
  const rows = Math.ceil(orbCollection.length / columnsInRow);
  const columnWidth =
    (bounds.width - config.verticalBuffer * 2 - config.orbSize / 2) /
    (columnsInRow - 1);
  const rowHeight = (bounds.height - config.verticalBuffer * 2) / rows;

  // for each orb, calculate and assign the x/y coordinates
  for (let i = 0; i < orbCollection.length; i += 1) {
    const orb = orbCollection[i];

    // rowIndex is from 0 (left of container) to columnsInRow (right of container)
    const rowIndex = Math.floor(i / columnsInRow);

    // columnIndex is from 0 (top of container) to rows (bottom of container)
    const columnIndex = i % columnsInRow;
    orb.x =
      config.verticalBuffer + columnIndex * columnWidth - config.orbSize / 2;
    orb.y = config.verticalBuffer + rowIndex * rowHeight - config.orbSize / 2;

    // also pass a delay for sequential animations
    orb.delay = i * 0.05;

    // store the data
    orbCollection[i] = orb;
  }

  return orbCollection;
}

export function isCorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem === currentOrb.type;
}

export function isIncorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem !== currentOrb.type;
}

export function completedOrbHandler(
  currentOrb,
  activeTask,
  frozenOrbInterface
) {
  const orbCopy = cloneDeep(currentOrb);
  if (isCorrectCompletedOrb(orbCopy, activeTask) || frozenOrbInterface) {
    orbCopy.y -= 2.0;
  } else if (isIncorrectCompletedOrb(orbCopy, activeTask)) {
    orbCopy.y += 2.0;
  }

  return orbCopy;
}

export function uncompletedOrbHandler(
  currentOrb,
  tick,
  index,
  orbConfig,
  frozenOrbInterface
) {
  if (frozenOrbInterface) return currentOrb;
  const orbCopy = cloneDeep(currentOrb);

  orbCopy.x += orbCopy.velocity.x; // + Math.cos(tick * 0.1) * period;
  orbCopy.y +=
    orbCopy.velocity.y + Math.sin((tick + index) * 0.1) * orbConfig.period;

  return orbCopy;
}