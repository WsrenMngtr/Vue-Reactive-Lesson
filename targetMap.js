const targetMap = new WeakMap();

let activeEffect = null;

function useEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

// 跟踪target对象的attr属性
function trackEffect(target, attr) {
  if (activeEffect) {
    let attrMap = targetMap.get(target);
    if (!attrMap) {
      targetMap.set(target, (attrMap = new Map()));
    }
    let effects = attrMap.get(attr);
    if (!effects) {
      attrMap.set(attr, (effects = new Set()));
    }
    effects.add(activeEffect);
  }
}

// 执行target的attr属性的所有影响
function triggerEffect(target, attr) {
  const attrMap = targetMap.get(target);
  if (attrMap) {
    const effects = attrMap.get(attr);
    if (effects) {
      effects.forEach((effect) => effect());
    }
  }
}

// 声名一个响应式对象
function reactive(obj) {
  return new Proxy(obj, {
    get(target, p) {
      const result = Reflect.get(target, p);
      trackEffect(target, p);
      return result;
    },
    set(target, p, value) {
      const result = Reflect.set(target, p, value);
      triggerEffect(target, p);
      return result;
    },
  });
}

module.exports = {
  useEffect,
  reactive,
};
