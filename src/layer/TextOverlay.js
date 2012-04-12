L.TextOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	initialize: function (/*String*/ caption, /*LatLng*/ coords) {
		this._caption = caption;
		this._coords = coords;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._text) {
			this._initText();
		}

		map.getPanes().overlayPane.appendChild(this._text);
		this._text.innerHTML = this._caption;

		map.on('viewreset', this._reset, this);
		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._text);
		map.off('viewreset', this._reset, this);
	},

	_initText: function () {
		this._text = L.DomUtil.create('span', 'leaflet-text-layer');

		L.Util.extend(this._text, {
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn
		});
	},

	_reset: function () {
		var pos = this._map.latLngToLayerPoint(this._coords);
		L.DomUtil.setPosition(this._text, pos);
	},

	_onImageLoad: function () {
		this._text.style.visibility = '';
		this.fire('load');
	}
});
