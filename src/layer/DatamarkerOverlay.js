L.DatamarkerOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	initialize: function (/*Int*/ id, /*Int*/ value, /*LatLng*/ coords, /*String*/ caption) {
		this._id = id;
		this._value = value;
		this._coords = coords;
		this._caption = caption;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._datamarker) {
			this._initDatamarker();
		}

		map.getPanes().overlayPane.appendChild(this._datamarker);
		this._datamarker.innerHTML = this._value + ' <span class="caption">' + this._caption + '</span>';

		map.on('viewreset', this._reset, this);
		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._datamarker);
		map.off('viewreset', this._reset, this);
	},

	_initDatamarker: function () {
		this._datamarker = L.DomUtil.create('a', 'leaflet-datamarker-layer');
		this._datamarker.id = this._id;

		L.Util.extend(this._datamarker, {
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn
		});
	},

	_reset: function () {
		var zoom = this._map.getZoom()-6;
		var topLeft = this._map.latLngToLayerPoint(this._coords);
		var size = 20 + ((this._value/500)^0.5) + 20*zoom;

		L.DomUtil.setPosition(this._datamarker, topLeft);

		this._datamarker.style.width = size + 'px';
		this._datamarker.style.height = size*0.7 + 'px';
		this._datamarker.style.marginLeft = -size/2 + 'px';
		this._datamarker.style.marginTop = -size/2 + 'px';
		this._datamarker.style.paddingTop = size*0.3 + 'px';
		this._datamarker.style.fontSize = size*0.3 + 'px';
		this._datamarker.style.borderRadius = size/2 + 'px';
	},

	_onImageLoad: function () {
		this._datamarker.style.visibility = '';
		this.fire('load');
	}
});
