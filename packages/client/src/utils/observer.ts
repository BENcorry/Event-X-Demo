export class Observer {
  _observer: IntersectionObserver | null = null;

  init(nodes: Element | null, callback: Function) {
    if (nodes) {
      this._observer = new IntersectionObserver((changes) => {
        //changes 是被观察的元素集合
        for (let i = 0, len = changes.length; i < len; i++) {
          let change = changes[i];
          // 通过这个属性判断是否在视口中
          if (change.isIntersecting) {
            callback();
            const target = change.target;
            this._observer?.unobserve(target);
          }
        }
      });

      this._observer.observe(nodes);
    }
  }

  unmounted() {
    this._observer?.disconnect();
  }
}
