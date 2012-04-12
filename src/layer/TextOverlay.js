L.TextOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	initialize: function (/*String*/ url, /*LatLng*/ coords) {
		this._url = url;
		this._coords = coords;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map.getPanes().overlayPane.appendChild(this._image);
		this._image.innerHTML = this._url;

		map.on('viewreset', this._reset, this);
		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._image);
		map.off('viewreset', this._reset, this);
	},

	_initImage: function () {
		this._image = L.DomUtil.create('span', 'leaflet-text-layer');

		//this._image.style.visibility = 'hidden';

		L.Util.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn//,
			//onload: L.Util.bind(this._onImageLoad, this),
			//src: this._url
		});
	},

	_reset: function () {
		var topLeft = this._map.latLngToLayerPoint(this._coords);
		var size = 500;

		L.DomUtil.setPosition(this._image, topLeft);

		this._image.style.width = size.x + 'px';
		this._image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this._image.style.visibility = '';
		this.fire('load');
	}
});
